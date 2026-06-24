/**
 * Cloudflare Worker: analyzes a food photo with Claude vision and returns
 * a nutrition estimate for the trainer.html food-log form.
 *
 * Deploy: see worker/README.md
 * Secret required: ANTHROPIC_API_KEY (wrangler secret put ANTHROPIC_API_KEY)
 */

const ALLOWED_ORIGIN = 'https://hkykit.github.io';
const MODEL = 'claude-haiku-4-5';

const NUTRITION_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: '食物名稱 (中文)' },
    calories: { type: 'number', description: '相片入面全部食物嘅總熱量估計 (kcal)' },
    protein: { type: 'number', description: '總蛋白質 (g)' },
    carbs: { type: 'number', description: '總碳水化合物 (g)' },
    fat: { type: 'number', description: '總脂肪 (g)' },
    sugar: { type: 'number', description: '總糖分 (g)' }
  },
  required: ['name', 'calories', 'protein', 'carbs', 'fat', 'sugar'],
  additionalProperties: false
};

function corsHeaders(origin) {
  const allow = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, headers);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: 'Invalid JSON body' }, 400, headers);
    }

    const { image, mediaType } = body;
    if (!image || !mediaType) {
      return json({ error: 'Missing image or mediaType' }, 400, headers);
    }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(mediaType)) {
      return json({ error: 'Unsupported mediaType' }, 400, headers);
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        output_config: {
          format: { type: 'json_schema', schema: NUTRITION_SCHEMA }
        },
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mediaType, data: image }
              },
              {
                type: 'text',
                text: '估計呢張相入面所有食物嘅總營養成份（當成一份計）。如果見到多種食物，請合計總數。盡量合理估計，回覆用中文食物名稱。'
              }
            ]
          }
        ]
      })
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      return json({ error: 'Upstream AI error', detail: errText }, 502, headers);
    }

    const data = await anthropicRes.json();
    const block = (data.content || []).find((b) => b.type === 'text');
    if (!block) {
      return json({ error: 'No response from model' }, 502, headers);
    }

    let estimate;
    try {
      estimate = JSON.parse(block.text);
    } catch (e) {
      return json({ error: 'Could not parse model output', detail: block.text }, 502, headers);
    }

    return json(estimate, 200, headers);
  }
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

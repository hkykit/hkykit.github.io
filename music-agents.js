// === AGENT 1 PANEL ===

const Agent1Panel = ({ onComplete, initialData }) => {
  const [theme, setTheme] = React.useState('');
  const [story, setStory] = React.useState('');
  const [mood, setMood] = React.useState('melancholic');
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState(null);

  const lyricTemplates = {
    melancholic: (t, s) => ({
      verse1:
        `在${t || '記憶'}的夜裡我獨自徘徊\n` +
        `街燈照著那些破碎的回憶\n` +
        `你的笑容還殘留在指尖\n` +
        `卻再也無法靠近你的心`,
      verse2:
        `${s ? s.slice(0, 8) : '往事'}如煙散去無聲無息\n` +
        `我站在原地等待奇蹟降臨\n` +
        `那些誓言已隨風飄散\n` +
        `只剩下我一人面對這黑夜`,
      chorus:
        `我知道這份愛已走到終點\n` +
        `淚水無法挽回那段緣分\n` +
        `放開你的手是最後的溫柔\n` +
        `讓思念在心中慢慢沉落`,
      bridge:
        `也許某天再相遇\n` +
        `我們都已不再是當初的彼此`,
      emotionTags: ['melancholic', 'longing', 'heartbroken'],
    }),
    uplifting: (t, s) => ({
      verse1:
        `每一個清晨都是新的開始\n` +
        `${t || '夢想'}讓我看見前方的光\n` +
        `不再害怕那些曾經的傷\n` +
        `因為我已找回勇敢的力量`,
      verse2:
        `${s ? s.slice(0, 8) : '曾經'}的淚水澆灌了今天\n` +
        `讓我在風雨後更加堅強\n` +
        `抬起頭來迎向燦爛陽光\n` +
        `未來還有無限的可能等著我`,
      chorus:
        `飛吧飛向那片自由的天空\n` +
        `帶著夢想衝破所有的界限\n` +
        `今天的我比昨天更強大\n` +
        `因為${t || '你'}給了我最大的勇氣`,
      bridge:
        `就算跌倒再爬起\n` +
        `這條路我一定走到底`,
      emotionTags: ['uplifting', 'hopeful', 'empowered'],
    }),
    nostalgic: (t, s) => ({
      verse1:
        `翻開舊相冊那些泛黃的照片\n` +
        `${t || '過去'}的記憶如此清晰\n` +
        `時光荏苒歲月如流水\n` +
        `那段日子永遠留在心底`,
      verse2:
        `${s ? s.slice(0, 8) : '那年'}的夏天我們一起追夢\n` +
        `笑聲迴盪在那條老街上\n` +
        `如今各奔東西天各一方\n` +
        `懷念那段純真美好的時光`,
      chorus:
        `親愛的你還好嗎\n` +
        `那些歌謠你還記得嗎\n` +
        `歲月偷走了年輕的臉\n` +
        `卻偷不走我心中的${t || '你'}`,
      bridge:
        `時光啊請你走慢些\n` +
        `讓我再多看一眼從前`,
      emotionTags: ['nostalgic', 'bittersweet', 'longing'],
    }),
    energetic: (t, s) => ({
      verse1:
        `${t || '熱血'}點燃了我胸中的火焰\n` +
        `沒有什麼能夠阻擋我前進\n` +
        `全力以赴衝破所有障礙\n` +
        `這一刻我要讓全世界看見`,
      verse2:
        `${s ? s.slice(0, 8) : '激情'}沸騰在每一個細胞\n` +
        `節奏帶動著我瘋狂的心跳\n` +
        `不停歇不回頭只管向前衝\n` +
        `${t || '夢想'}就是我最強的武器`,
      chorus:
        `燃燒吧燃燒所有的激情\n` +
        `讓汗水見證每一個拼搏\n` +
        `我就是我最閃亮的那顆星\n` +
        `沒有人能熄滅我的光芒`,
      bridge:
        `給我音樂給我舞台\n` +
        `今晚整個世界都是我的`,
      emotionTags: ['energetic', 'passionate', 'fierce'],
    }),
    peaceful: (t, s) => ({
      verse1:
        `微風輕拂過${t || '原野'}的邊際\n` +
        `心靈在這一刻得到了安寧\n` +
        `放下所有的煩惱與牽掛\n` +
        `只是靜靜地感受這份美好`,
      verse2:
        `${s ? s.slice(0, 8) : '生命'}本是一場緩慢的旅途\n` +
        `不必急著到達什麼地方\n` +
        `沿途的風景自有它的美麗\n` +
        `慢慢走慢慢感受這一切`,
      chorus:
        `讓心歸於平靜如湖面\n` +
        `倒映著${t || '天空'}的溫柔模樣\n` +
        `呼吸著清新的空氣與光\n` +
        `此刻的幸福就是最好的禮物`,
      bridge:
        `靜默中聽見自己的心跳\n` +
        `原來最美的風景就在當下`,
      emotionTags: ['peaceful', 'serene', 'gentle'],
    }),
  };

  const handleGenerate = () => {
    if (!theme.trim()) {
      alert('請輸入主題！');
      return;
    }
    setLoading(true);
    setOutput(null);
    setTimeout(() => {
      const tpl = lyricTemplates[mood](theme, story);
      setOutput({
        theme,
        story,
        mood,
        lyrics: {
          verse1: tpl.verse1,
          verse2: tpl.verse2,
          chorus: tpl.chorus,
          bridge: tpl.bridge,
        },
        emotionTags: tpl.emotionTags,
      });
      setLoading(false);
    }, 1500);
  };

  const handleNext = () => {
    if (output && onComplete) onComplete(output);
  };

  const tagPalette = {
    melancholic: '#b39ddb', longing: '#ce93d8', heartbroken: '#f48fb1',
    uplifting: '#a5d6a7', hopeful: '#80cbc4', empowered: '#fff176',
    nostalgic: '#ffcc80', bittersweet: '#ffab91',
    energetic: '#ef9a9a', passionate: '#ff8a65', fierce: '#ff7043',
    peaceful: '#b2ebf2', serene: '#b3e5fc', gentle: '#c5cae9',
  };

  const s = {
    card: {
      background: 'var(--white)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      border: '2.5px solid var(--pink)',
      padding: '2rem',
      marginBottom: '1.5rem',
    },
    heading: {
      fontFamily: 'Pacifico, cursive',
      color: 'var(--g800)',
      fontSize: '1.6rem',
      margin: '0 0 0.25rem',
    },
    sub: {
      fontFamily: 'Nunito, sans-serif',
      color: 'var(--g700)',
      fontSize: '0.93rem',
      marginBottom: '1.5rem',
      opacity: 0.85,
    },
    label: {
      display: 'block',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      color: 'var(--g800)',
      marginBottom: '0.35rem',
      fontSize: '0.93rem',
    },
    field: {
      width: '100%',
      padding: '0.65rem 1rem',
      borderRadius: 'var(--rsm)',
      border: '1.5px solid var(--g300)',
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.93rem',
      color: 'var(--text)',
      background: 'var(--g50)',
      boxSizing: 'border-box',
      outline: 'none',
      marginBottom: '1rem',
      display: 'block',
    },
    btn: {
      width: '100%',
      padding: '0.85rem 1.5rem',
      borderRadius: 'var(--rsm)',
      border: 'none',
      background: 'linear-gradient(135deg, var(--g700), var(--g800))',
      color: 'var(--white)',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      fontSize: '1.05rem',
      cursor: 'pointer',
      letterSpacing: '0.03em',
    },
    nextBtn: {
      width: '100%',
      padding: '0.85rem 1.5rem',
      borderRadius: 'var(--rsm)',
      border: 'none',
      background: 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
      color: 'var(--white)',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      fontSize: '1.05rem',
      cursor: 'pointer',
      letterSpacing: '0.03em',
      marginTop: '1rem',
    },
    sectionCard: {
      background: 'var(--g50)',
      borderRadius: 'var(--rsm)',
      padding: '0.9rem 1.1rem',
      marginBottom: '0.75rem',
      borderLeft: '4px solid var(--g500)',
    },
    sectionLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      color: 'var(--g700)',
      fontSize: '0.78rem',
      marginBottom: '0.4rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    lyricText: {
      fontFamily: 'Nunito, sans-serif',
      color: 'var(--text)',
      lineHeight: 2,
      fontSize: '0.97rem',
      whiteSpace: 'pre-line',
      margin: 0,
    },
    tagRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1.1rem',
    },
    tag: (color) => ({
      background: color || '#e0e0e0',
      color: '#1b4332',
      borderRadius: '999px',
      padding: '0.25rem 0.85rem',
      fontSize: '0.8rem',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    }),
  };

  const lyricsConfig = [
    { key: 'verse1', label: '主歌一 Verse I' },
    { key: 'verse2', label: '主歌二 Verse II' },
    { key: 'chorus', label: '副歌 Chorus' },
    { key: 'bridge', label: '橋段 Bridge' },
  ];

  return (
    <div style={s.card} className="ms-agent1-panel">
      <h2 style={s.heading}>🎤 Agent 1 — 作詞</h2>
      <p style={s.sub}>輸入主題和故事，生成歌詞結構</p>

      <div className="ms-form-group">
        <label style={s.label}>🏷️ 主題 Theme</label>
        <input
          style={s.field}
          type="text"
          value={theme}
          onChange={e => setTheme(e.target.value)}
          placeholder="e.g. 失去的愛、重新出發"
        />
      </div>

      <div className="ms-form-group">
        <label style={s.label}>📖 故事內容 Story</label>
        <textarea
          style={{ ...s.field, minHeight: '96px', resize: 'vertical' }}
          rows={4}
          value={story}
          onChange={e => setStory(e.target.value)}
          placeholder="描述你想說的故事或情感..."
        />
      </div>

      <div className="ms-form-group">
        <label style={s.label}>💫 情緒 Mood</label>
        <select style={s.field} value={mood} onChange={e => setMood(e.target.value)}>
          <option value="melancholic">憂鬱 Melancholic</option>
          <option value="uplifting">振奮 Uplifting</option>
          <option value="nostalgic">懷舊 Nostalgic</option>
          <option value="energetic">活力 Energetic</option>
          <option value="peaceful">平靜 Peaceful</option>
        </select>
      </div>

      <button
        style={{ ...s.btn, opacity: loading ? 0.65 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '🎵 正在寫詞...' : '✨ 生成歌詞'}
      </button>

      {output && !loading && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={s.tagRow}>
            {output.emotionTags.map(tag => (
              <span key={tag} style={s.tag(tagPalette[tag])}>#{tag}</span>
            ))}
          </div>

          {lyricsConfig.map(({ key, label }) => (
            <div key={key} style={s.sectionCard}>
              <div style={s.sectionLabel}>{label}</div>
              <p style={s.lyricText}>{output.lyrics[key]}</p>
            </div>
          ))}

          <button style={s.nextBtn} onClick={handleNext}>
            下一步：編曲 →
          </button>
        </div>
      )}
    </div>
  );
};

// === AGENT 2 PANEL ===

const Agent2Panel = ({ agent1Output, onComplete }) => {
  const [genre, setGenre] = React.useState('Pop');
  const [specialPref, setSpecialPref] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState(null);

  const moodBpmRanges = {
    melancholic: [60, 75],
    uplifting: [120, 135],
    nostalgic: [75, 90],
    energetic: [130, 145],
    peaceful: [65, 80],
  };

  const moodKeys = {
    melancholic: ['C minor', 'A minor', 'D minor'],
    uplifting:   ['G major', 'D major', 'A major'],
    nostalgic:   ['F major', 'G major', 'Bb major'],
    energetic:   ['E minor', 'B minor', 'A major'],
    peaceful:    ['C major', 'A major', 'F major'],
  };

  const moodTempo = {
    melancholic: 'slow',
    uplifting: 'fast',
    nostalgic: 'medium',
    energetic: 'fast',
    peaceful: 'slow',
  };

  const chordMap = {
    Pop: {
      melancholic: ['Am', 'F', 'C', 'G'],
      uplifting:   ['C', 'G', 'Am', 'F'],
      nostalgic:   ['F', 'C', 'G', 'Am'],
      energetic:   ['G', 'D', 'Em', 'C'],
      peaceful:    ['C', 'Em', 'F', 'G'],
    },
    'R&B': {
      melancholic: ['Am7', 'Dm7', 'G7', 'Cmaj7'],
      uplifting:   ['Cmaj7', 'Am7', 'Dm7', 'G7'],
      nostalgic:   ['Fmaj7', 'Em7', 'Am7', 'Dm7'],
      energetic:   ['Em7', 'A7', 'Dm7', 'G7'],
      peaceful:    ['Cmaj7', 'Em7', 'Fmaj7', 'G7'],
    },
    Ballad: {
      melancholic: ['Am', 'Em', 'F', 'G'],
      uplifting:   ['C', 'Am', 'F', 'G'],
      nostalgic:   ['G', 'Em', 'C', 'D'],
      energetic:   ['D', 'A', 'Bm', 'G'],
      peaceful:    ['F', 'C', 'Am', 'G'],
    },
    Rock: {
      melancholic: ['Em', 'Am', 'D', 'C'],
      uplifting:   ['A', 'D', 'E', 'A'],
      nostalgic:   ['G', 'C', 'D', 'Em'],
      energetic:   ['E5', 'A5', 'D5', 'C5'],
      peaceful:    ['D', 'G', 'A', 'D'],
    },
    Folk: {
      melancholic: ['Am', 'G', 'F', 'E'],
      uplifting:   ['G', 'D', 'C', 'G'],
      nostalgic:   ['C', 'G', 'Am', 'Em'],
      energetic:   ['D', 'G', 'A', 'D'],
      peaceful:    ['G', 'C', 'G', 'D'],
    },
    Electronic: {
      melancholic: ['Am', 'F', 'C', 'E'],
      uplifting:   ['F', 'G', 'Am', 'C'],
      nostalgic:   ['Dm', 'Am', 'Bb', 'F'],
      energetic:   ['Cm', 'Gm', 'Ab', 'Eb'],
      peaceful:    ['Am', 'Em', 'G', 'D'],
    },
  };

  const instrumentationMap = {
    Pop:        ['電子鼓組', '合成器', '電吉他', 'Bass', '人聲和聲'],
    'R&B':      ['鼓機', '電子琴', '電吉他', '薩克斯風', '弦樂'],
    Ballad:     ['鋼琴', '弦樂組', '古典吉他', '人聲和聲', '長笛'],
    Rock:       ['電吉他', '貝斯', '鼓組', '鍵盤', '節奏吉他'],
    Folk:       ['木吉他', '小提琴', '口琴', '班卓琴', '烏克麗麗'],
    Electronic: ['合成器', '電子鼓', 'Pad音色', '採樣器', '效果器'],
  };

  const noteMap = {
    Pop: {
      melancholic: '以輕柔鋼琴和弦樂為主軸，營造憂鬱氛圍。副歌加入細緻合成器層次，情感逐漸升溫，保留充分空間讓歌詞呼吸。',
      uplifting:   '電吉他和電子鼓為骨幹，合成器注入明亮能量。副歌加入人聲和聲，打造充滿希望與活力的流行氛圍。',
      nostalgic:   '木吉他與輕柔鋼琴相互輝映，弦樂渲染懷舊情懷。編排簡潔，讓旋律與歌詞成為主角，副歌適當加入輕唱和聲。',
      energetic:   '強勁鼓組搭配失真吉他製造衝勁律動，合成器補充音場厚度，Bass線活躍有力，整體動態起伏大展現活力。',
      peaceful:    '輕柔鋼琴與輕撥木吉他為主，弦樂淡淡鋪底，編排稀疏富空間感，如微風拂面般寧靜而美好。',
    },
    'R&B': {
      melancholic: '厚重鼓機節奏搭配細膩鋼琴和弦，展現R&B特有的憂鬱質感。薩克斯風獨奏讓情感深沉，弦樂輕鋪慵懶底色。',
      uplifting:   '流暢R&B節拍配合明亮鍵盤，都會感振奮氛圍躍然紙上。人聲和聲分層豐富，現代合成器增添時髦質感。',
      nostalgic:   '復古鼓機與電子琴為核心，薩克斯風重現七八十年代溫暖質感，Bass線圓潤有力，充滿懷舊色彩。',
      energetic:   '現代R&B風格，808 Bass強勁有力，電子鼓節奏複雜多變，合成器豐富層疊，充滿能量與張力。',
      peaceful:    '輕柔鍵盤和弦配合安靜鼓機，呈現neo-soul的溫柔質感，薩克斯風輕聲吟唱，創造如夢似幻的氛圍。',
    },
    Ballad: {
      melancholic: '鋼琴獨挑大樑，弦樂四重奏提供情感支撐，從簡單鋼琴獨奏逐漸疊加，副歌達到情感高峰，長笛點綴淡淡哀愁。',
      uplifting:   '輕柔鋼琴前奏出發，弦樂在副歌加入製造高潮，人聲和聲豐富展現振奮情緒，結尾樂器漸退留下深刻餘韻。',
      nostalgic:   '吉他與鋼琴共同主導旋律，弦樂輕柔裝飾，採用簡潔編排讓情感透明呈現，長笛點綴懷舊色彩。',
      energetic:   '抒情搖滾融合，電吉他與鋼琴互相輝映，鼓組在副歌加入帶動能量，弦樂在高潮達到最飽滿的音場。',
      peaceful:    '簡單木吉他或鋼琴獨奏，不加多餘裝飾，弦樂在副歌輕輕進入如蟬翼般透明，整體寧靜如詩。',
    },
    Rock: {
      melancholic: '電吉他清音與破音交替展現情感層次，Bass線深沉有力，副歌加大失真讓憂鬱轉化為爆發力。',
      uplifting:   '明快吉他riff搭配有力鼓組充滿搖滾精神，和聲人聲強化副歌振奮感，吉他solo帶來情感昇華。',
      nostalgic:   '以八十年代搖滾為靈感，老式失真音色配合reverb，旋律主導，吉他solo帶有懷舊的鳴叫感。',
      energetic:   '重型吉他riff驅動整首歌，功率和弦製造強烈衝擊，Bass厚重有力，充滿腎上腺素飆升的感覺。',
      peaceful:    '清音電吉他為主，配合輕柔鼓刷聲，偏向民謠搖滾質感，溫暖而寧靜如篝火旁的輕鬆歌唱。',
    },
    Folk: {
      melancholic: '木吉他主導旋律，小提琴提供悠揚情感，口琴在橋段吹出淡淡哀愁，整體如山野間的傷感故事。',
      uplifting:   '歡快的木吉他 picking搭配烏克麗麗明亮音色，小提琴在副歌奏出跳躍旋律，充滿民謠純樸活力。',
      nostalgic:   '烏克麗麗與木吉他交織溫柔旋律，小提琴如訴如泣，班卓琴帶來鄉村色彩，整體簡樸真誠如記憶中的純真年代。',
      energetic:   '快節奏民謠，木吉他 strumming強勁有力，班卓琴快速 picking帶動律動，充滿民謠搖滾奔放精神。',
      peaceful:    '輕柔木吉他 fingerpicking為主，烏克麗麗點綴，小提琴輕聲拉奏如小溪潺潺，寧靜如遠離喧囂的山間清晨。',
    },
    Electronic: {
      melancholic: '深沉合成器 pad鋪底製造憂鬱電子氛圍，電子鼓搭配延遲效果創造獨特時間感，帶有電音特有的疏離美感。',
      uplifting:   '明亮合成器 lead旋律配合高能量電子鼓，build-up與 drop結構製造情緒起伏，充滿電音舞池的振奮能量。',
      nostalgic:   '復古合成器音色帶有八十年代 synth-pop質感，鼓機節奏懷舊，磁帶質感效果器讓整體充滿電子懷舊色彩。',
      energetic:   '重型 Bass drop配合快速電子鼓製造超強能量，合成器音色豐富多變，大量側鍊壓縮製造律動感，如DJ高峰時刻。',
      peaceful:    '輕柔環境音電子樂，柔和 pad與輕微 arpeggio交融，電子鼓淡化，如夜晚城市的靜謐星空。',
    },
  };

  const handleGenerate = () => {
    setLoading(true);
    setOutput(null);
    const mood = (agent1Output && agent1Output.mood) || 'peaceful';
    setTimeout(() => {
      const [bpmMin, bpmMax] = moodBpmRanges[mood] || [80, 100];
      const bpm = Math.floor(Math.random() * (bpmMax - bpmMin + 1)) + bpmMin;
      const keyOptions = moodKeys[mood] || ['C major'];
      const key = keyOptions[Math.floor(Math.random() * keyOptions.length)];
      const genreChords = chordMap[genre] || chordMap['Pop'];
      const chordProgression = genreChords[mood] || genreChords['peaceful'] || ['C', 'Am', 'F', 'G'];
      const instrumentation = instrumentationMap[genre] || instrumentationMap['Pop'];
      const genreNotes = noteMap[genre] || noteMap['Pop'];
      const baseNote = genreNotes[mood] || genreNotes['peaceful'];
      const arrangementNote = specialPref
        ? `${baseNote} 特別加入：${specialPref}，進一步豐富音樂層次。`
        : baseNote;

      setOutput({
        bpm,
        key,
        chordProgression,
        genre,
        tempo: moodTempo[mood] || 'medium',
        instrumentation,
        arrangementNote,
      });
      setLoading(false);
    }, 1500);
  };

  const handleNext = () => {
    if (output && onComplete) onComplete(output);
  };

  const tagPalette = {
    melancholic: '#b39ddb', longing: '#ce93d8', heartbroken: '#f48fb1',
    uplifting: '#a5d6a7', hopeful: '#80cbc4', empowered: '#fff176',
    nostalgic: '#ffcc80', bittersweet: '#ffab91',
    energetic: '#ef9a9a', passionate: '#ff8a65', fierce: '#ff7043',
    peaceful: '#b2ebf2', serene: '#b3e5fc', gentle: '#c5cae9',
  };

  const tempoLabel = { slow: '慢板', medium: '中板', fast: '快板' };

  const s = {
    card: {
      background: 'var(--white)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      border: '2.5px solid #7986cb',
      padding: '2rem',
      marginBottom: '1.5rem',
    },
    heading: {
      fontFamily: 'Pacifico, cursive',
      color: 'var(--g800)',
      fontSize: '1.6rem',
      margin: '0 0 0.25rem',
    },
    sub: {
      fontFamily: 'Nunito, sans-serif',
      color: 'var(--g700)',
      fontSize: '0.93rem',
      marginBottom: '1.5rem',
      opacity: 0.85,
    },
    label: {
      display: 'block',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      color: 'var(--g800)',
      marginBottom: '0.35rem',
      fontSize: '0.93rem',
    },
    field: {
      width: '100%',
      padding: '0.65rem 1rem',
      borderRadius: 'var(--rsm)',
      border: '1.5px solid var(--g300)',
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.93rem',
      color: 'var(--text)',
      background: 'var(--g50)',
      boxSizing: 'border-box',
      outline: 'none',
      marginBottom: '1rem',
      display: 'block',
    },
    btn: {
      width: '100%',
      padding: '0.85rem 1.5rem',
      borderRadius: 'var(--rsm)',
      border: 'none',
      background: 'linear-gradient(135deg, #5c6bc0, #3949ab)',
      color: 'var(--white)',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      fontSize: '1.05rem',
      cursor: 'pointer',
      letterSpacing: '0.03em',
    },
    nextBtn: {
      width: '100%',
      padding: '0.85rem 1.5rem',
      borderRadius: 'var(--rsm)',
      border: 'none',
      background: 'linear-gradient(135deg, var(--g700), var(--g800))',
      color: 'var(--white)',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      fontSize: '1.05rem',
      cursor: 'pointer',
      letterSpacing: '0.03em',
      marginTop: '1rem',
    },
    tagRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1.25rem',
      alignItems: 'center',
    },
    tagRowLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.83rem',
      color: 'var(--g700)',
      fontWeight: 700,
    },
    tag: (color) => ({
      background: color || '#e0e0e0',
      color: '#1b4332',
      borderRadius: '999px',
      padding: '0.25rem 0.85rem',
      fontSize: '0.8rem',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    }),
    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.75rem',
      marginBottom: '1rem',
    },
    statTile: {
      background: 'linear-gradient(135deg, #e8eaf6, #c5cae9)',
      borderRadius: 'var(--rsm)',
      padding: '0.75rem 0.5rem',
      textAlign: 'center',
    },
    statTileLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.72rem',
      color: '#5c6bc0',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '0.2rem',
    },
    statTileValue: {
      fontFamily: 'Pacifico, cursive',
      fontSize: '1.25rem',
      color: '#3949ab',
    },
    sectionLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      color: 'var(--g700)',
      fontSize: '0.78rem',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    chordBadge: {
      background: 'linear-gradient(135deg, #5c6bc0, #3949ab)',
      color: 'var(--white)',
      borderRadius: 'var(--rsm)',
      padding: '0.35rem 1rem',
      fontFamily: 'Pacifico, cursive',
      fontSize: '1rem',
    },
    instBadge: {
      background: 'var(--g100)',
      color: 'var(--g800)',
      borderRadius: '999px',
      padding: '0.28rem 0.85rem',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '0.83rem',
      border: '1.5px solid var(--g300)',
    },
    noteBox: {
      background: 'var(--g50)',
      borderRadius: 'var(--rsm)',
      padding: '0.9rem 1.1rem',
      borderLeft: '4px solid #7986cb',
      marginBottom: '0.5rem',
    },
    noteBoxLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 800,
      color: '#5c6bc0',
      fontSize: '0.78rem',
      marginBottom: '0.4rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    noteText: {
      fontFamily: 'Nunito, sans-serif',
      color: 'var(--text)',
      lineHeight: 1.85,
      fontSize: '0.95rem',
      margin: 0,
    },
  };

  const emotionTags = (agent1Output && agent1Output.emotionTags) || [];

  return (
    <div style={s.card} className="ms-agent2-panel">
      <h2 style={s.heading}>🎼 Agent 2 — 編曲風格</h2>
      <p style={s.sub}>根據歌詞，推薦音樂風格與和弦</p>

      {emotionTags.length > 0 && (
        <div style={s.tagRow}>
          <span style={s.tagRowLabel}>情緒標籤：</span>
          {emotionTags.map(tag => (
            <span key={tag} style={s.tag(tagPalette[tag])}>#{tag}</span>
          ))}
        </div>
      )}

      <div className="ms-form-group">
        <label style={s.label}>🎵 曲風 Genre</label>
        <select style={s.field} value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="Pop">流行 Pop</option>
          <option value="R&B">R&amp;B</option>
          <option value="Ballad">抒情 Ballad</option>
          <option value="Rock">搖滾 Rock</option>
          <option value="Folk">民謠 Folk</option>
          <option value="Electronic">電子 Electronic</option>
        </select>
      </div>

      <div className="ms-form-group">
        <label style={s.label}>✨ 特別偏好 Special Preferences</label>
        <input
          style={s.field}
          type="text"
          value={specialPref}
          onChange={e => setSpecialPref(e.target.value)}
          placeholder="e.g. 加入鋼琴、小提琴..."
        />
      </div>

      <button
        style={{ ...s.btn, opacity: loading ? 0.65 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '🎼 分析中...' : '🎼 生成編曲方案'}
      </button>

      {output && !loading && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={s.statGrid}>
            <div style={s.statTile}>
              <div style={s.statTileLabel}>BPM</div>
              <div style={s.statTileValue}>{output.bpm}</div>
            </div>
            <div style={s.statTile}>
              <div style={s.statTileLabel}>調性</div>
              <div style={{ ...s.statTileValue, fontSize: '0.95rem' }}>{output.key}</div>
            </div>
            <div style={s.statTile}>
              <div style={s.statTileLabel}>速度</div>
              <div style={s.statTileValue}>{tempoLabel[output.tempo] || output.tempo}</div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={s.sectionLabel}>和弦進行 Chord Progression</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {output.chordProgression.map((chord, i) => (
                <span key={i} style={s.chordBadge}>{chord}</span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={s.sectionLabel}>編曲樂器 Instrumentation</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {output.instrumentation.map((inst, i) => (
                <span key={i} style={s.instBadge}>{inst}</span>
              ))}
            </div>
          </div>

          <div style={s.noteBox}>
            <div style={s.noteBoxLabel}>編曲說明 Arrangement Note</div>
            <p style={s.noteText}>{output.arrangementNote}</p>
          </div>

          <button style={s.nextBtn} onClick={handleNext}>
            下一步：整合 →
          </button>
        </div>
      )}
    </div>
  );
};

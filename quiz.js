const QUESTIONS = [
  {
    q: "What does Bobo love to drink the most? 🥛",
    correct: "Bobo sips water and milk! 🥛",
    wrong: ["Bubble tea all day! 🧋", "Matcha latte, always! 🍵", "Coffee is life! ☕"]
  },
  {
    q: "How does Bobo cheer herself up on a rough day? ☁️",
    correct: "Bobo treats herself to good food! 🍜",
    wrong: ["Goes for a long walk! 🚶", "Calls the bestie right away! 📱", "Watches sad movies and cries! 😭"]
  },
  {
    q: "Which emoji does Bobo use the most? 😄",
    correct: "😂 — always laughing!",
    wrong: ["🥰 — always loving!", "😭 — always feeling it!", "🙄 — always unbothered!"]
  },
  {
    q: "Which show or movie could Bobo rewatch a thousand times? 🎬",
    correct: "MI, 流星花園, 惡魔在身邊, 龍鳳鬥, Suits! 🎭",
    wrong: ["Friends, The Office, SATC! 📺", "Korean dramas, endlessly! 🇰🇷", "Anime only, forever! 🌸"]
  },
  {
    q: "Where is Bobo's absolute dream destination? ✈️",
    correct: "Home after Bobo circles the globe! 🌍",
    wrong: ["Bali beaches, forever! 🌴", "Paris every single time! 🗼", "Tokyo, no contest! 🗾"]
  },
  {
    q: "What is Bobo's love language? 💕",
    correct: "Bobo's boyfriend is everything! 💚",
    wrong: ["Acts of service, please! 🙏", "Gift giving, always! 🎁", "Words of affirmation! 💬"]
  },
  {
    q: "How does Bobo order her favourite drink? ☕",
    correct: "Bobo's an espresso tonic lover! 🥂",
    wrong: ["Bubble tea, of course! 🧋", "Matcha latte, thank you! 🍵", "Black coffee, straight up! ☕"]
  },
  {
    q: "What is Bobo's biggest fear? 😱",
    correct: "Finally, something scares Bobo! 👻",
    wrong: ["Losing Bobo's phone! 📵", "Running out of snacks! 🍪", "Missing Bobo's flight! ✈️"]
  },
  {
    q: "What activity makes Bobo the absolute happiest? 😊",
    correct: "Bobo sleeps whenever Bobo wants! 😴",
    wrong: ["Shopping all day long! 🛍️", "Eating at new places! 🍽️", "Watching sunsets! 🌅"]
  },
  {
    q: "What's the very first thing Bobo does every morning? 🌅",
    correct: "Bobo just opens her eyes! 👀",
    wrong: ["Checks Bobo's phone immediately! 📱", "Makes a cup of coffee! ☕", "Goes back to sleep! 💤"]
  }
];

const RESULTS = [
  { min: 10, emo: "🏆", msg: "PERFECT SCORE!! You know Bobo inside out, My Bobo! Bobo is so incredibly proud of you! 💚🐼" },
  { min: 8,  emo: "🥰", msg: "Wow, you know Bobo so well! A few more cuddles and you'll be a certified Bobo expert! 🐼💚" },
  { min: 6,  emo: "😊", msg: "Not bad at all, love! You've clearly been paying attention! Keep discovering more about your Bobo~ 🌿" },
  { min: 4,  emo: "🤗", msg: "We still have so much to learn about each other! More dates = more Bobo facts! Let's go! 💚" },
  { min: 0,  emo: "🐼", msg: "Oops! Bobo needs way more quality time with you so you can know her better! Challenge accepted? 🌿" }
];

let current = 0;
let score = 0;
let answered = false;
let shuffled = [];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  answered = false;
  const q = QUESTIONS[current];

  shuffled = shuffle([
    { text: q.correct, correct: true },
    ...q.wrong.map(w => ({ text: w, correct: false }))
  ]);

  document.getElementById('q-tag').textContent = `Question ${current + 1} 🐼`;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('progress-fill').style.width = `${(current / QUESTIONS.length) * 100}%`;
  document.getElementById('progress-label').textContent = `Question ${current + 1} of ${QUESTIONS.length}`;

  const grid = document.getElementById('options');
  grid.innerHTML = '';
  shuffled.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.textContent = opt.text;
    btn.style.animationDelay = `${i * 180}ms`;
    btn.addEventListener('click', () => pick(btn, opt.correct));
    grid.appendChild(btn);
  });

  const nxt = document.getElementById('next-btn');
  nxt.style.display = 'none';
  nxt.style.opacity = '0';
  nxt.style.animation = '';
}

function pick(btn, isCorrect) {
  if (answered) return;
  answered = true;

  document.querySelectorAll('.opt-btn').forEach((b, i) => {
    b.disabled = true;
    if (shuffled[i].correct) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');
  else score++;

  const nxt = document.getElementById('next-btn');
  nxt.style.display = 'block';
  void nxt.offsetWidth;
  nxt.style.animation = 'fadein .35s ease .15s forwards';
  nxt.textContent = current < QUESTIONS.length - 1 ? 'Next question →' : 'See my score! 🎉';
}

function next() {
  current++;
  if (current >= QUESTIONS.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function showResult() {
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('progress-fill').style.width = '100%';
  document.getElementById('progress-label').textContent = 'Done! 🎉';

  const card = document.getElementById('result-card');
  card.classList.add('show');

  const res = RESULTS.find(r => score >= r.min);
  document.getElementById('result-emo').textContent = res.emo;
  document.getElementById('result-score').textContent = `${score}/10`;
  document.getElementById('result-msg').textContent = res.msg;
}

function reset() {
  current = 0; score = 0;
  document.getElementById('result-card').classList.remove('show');
  document.getElementById('quiz-section').style.display = 'block';
  loadQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
  document.getElementById('next-btn').addEventListener('click', next);
  document.getElementById('retry-btn').addEventListener('click', reset);
});

const fs = require('fs');
// const path = require('path');


const FILE = 'top100.json';
const URL = 'https://www.chess.com/callback/leaderboard/live?page=';
const INTERVAL = 5 * 60 * 1000; // 5 minutos

async function saveTop100() {
  const players = [];
  //2 se usan dos páginas porque el endpoint da 50 y 50
  for (const page of [1, 2]) {
    const res = await fetch(URL + page, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const { leaders } = await res.json();
    for (const l of leaders) {
      players.push({ rank: l.rank, username: l.user.username, title: l.user.chess_title, score: l.score });
    }
  }

  let history = [];
  if (fs.existsSync(FILE)) {
    const text = fs.readFileSync(FILE, 'utf8');
    history = JSON.parse(text);
  }

  history.push({ timestamp: new Date().toISOString(), players });

  fs.writeFileSync(FILE, JSON.stringify(history, null, 2));

  console.log(`Saved ${players.length} players (snapshot #${history.length})`);
}

saveTop100().catch(console.error);
setInterval(() => saveTop100().catch(console.error), INTERVAL);

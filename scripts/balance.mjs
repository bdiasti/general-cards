import { writeFile } from 'node:fs/promises';
import { combatCards } from '../src/combat-cards.js';
import { createBattle, chooseAction, act } from '../src/battle.js';
let seed = 20260920;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
const ids = Object.keys(combatCards), teams = [];
for (let a = 0; a < ids.length; a++) for (let b = a + 1; b < ids.length; b++) for (let c = b + 1; c < ids.length; c++) teams.push([ids[a], ids[b], ids[c]]);
const perCard = Object.fromEntries(ids.map(id => [id, { games: 0, score: 0 }]));
const perTeam = teams.map(team => ({ team, games: 0, score: 0 }));
let games = 0, firstWins = 0, draws = 0, rounds = 0, longest = 0;
const quick = process.argv.includes('--quick');
for (let a = 0; a < teams.length; a++) for (let b = a + 1; b < teams.length; b++) {
  if (quick && (a + b) % 5 !== 0) continue;
  for (const first of [0, 1]) {
    let s = createBattle([teams[a], teams[b]], first);
    while (s.winner === null) s = act(s, chooseAction(s, random));
    games++; rounds += s.round; longest = Math.max(longest, s.round);
    if (s.winner === 'draw') draws++; else if (s.winner === first) firstWins++;
    for (const [side, index] of [a, b].entries()) {
      const score = s.winner === 'draw' ? .5 : s.winner === side ? 1 : 0;
      perTeam[index].games++; perTeam[index].score += score;
      for (const id of teams[index]) { perCard[id].games++; perCard[id].score += score; }
    }
  }
  if (games % 400 === 0) console.log(`${games} duelos simulados`);
}
const percent = value => Number((value * 100).toFixed(2));
const report = { seed: 20260920, method: `Todas as equipes de 3 cartas; ${quick ? 'amostra de pares de equipes' : 'todos os pares diferentes de equipes'} com iniciativa invertida; mesmo bot tático para os dois lados. Empate vale meio ponto. Sem jogadores humanos.`, quick, games, teams: teams.length, draws, firstPlayerScore: percent((firstWins + draws / 2) / games), averageRounds: Number((rounds / games).toFixed(2)), longest,
  cards: Object.entries(perCard).map(([id, c]) => ({ id, games: c.games, scorePercent: percent(c.score / c.games) })),
  strongestTeams: perTeam.sort((a, b) => b.score / b.games - a.score / a.games).slice(0, 5).map(t => ({ team: t.team, games: t.games, scorePercent: percent(t.score / t.games) })) };
console.log(JSON.stringify(report, null, 2));
await writeFile(quick ? '.sites-runtime/balance-quick.json' : 'docs/balance-report.json', JSON.stringify(report, null, 2) + '\n');

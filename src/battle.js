import { combatCards as catalog, RULES } from './combat-cards.js';

export function validateTeam(team) {
  return Array.isArray(team) && team.length === RULES.teamSize && new Set(team).size === team.length && team.every(id => Object.hasOwn(catalog, id));
}
export function createBattle(teams, first = 0) {
  if (!Array.isArray(teams) || teams.length !== 2 || !teams.every(validateTeam) || ![0, 1].includes(first)) throw new Error('Selecione 3 cartas diferentes para cada equipe.');
  return { round: 1, active: first, initiative: first, winner: null, mana: [RULES.mana, RULES.mana], history: [],
    teams: teams.map(team => team.map(id => ({ id, hp: catalog[id].hp, shield: 0, poison: 0, weak: false, marked: false, cooldown: 0, used: false }))),
    log: [`Rodada 1. Equipe ${first + 1} começa. Cada carta age uma vez por rodada.`] };
}
const available = team => team.some(u => u.hp > 0 && !u.used);
export function legalActions(state) {
  if (state.winner !== null) return [];
  const side = state.active;
  const result = [];
  state.teams[side].forEach((u, actor) => {
    if (u.hp <= 0 || u.used) return;
    result.push({ actor, kind: 'guard', target: actor });
    state.teams[1 - side].forEach((t, target) => { if (t.hp > 0) result.push({ actor, kind: 'attack', target }); });
    const c = catalog[u.id];
    if (u.cooldown || state.mana[side] < c.cost) return;
    state.teams[c.target === 'ally' ? side : 1 - side].forEach((t, target) => {
      if (t.hp > 0 && (c.target !== 'ally' || t.hp < catalog[t.id].hp)) result.push({ actor, kind: 'power', target });
    });
  });
  return result;
}
function endCheck(s) {
  const alive = s.teams.map(t => t.some(u => u.hp > 0));
  if (!alive[0] && !alive[1]) s.winner = 'draw';
  else if (!alive[0]) s.winner = 1;
  else if (!alive[1]) s.winner = 0;
  if (s.winner !== null) s.log.push(s.winner === 'draw' ? 'Empate: as duas equipes caíram.' : `Vitória da equipe ${s.winner + 1}.`);
}
function damage(unit, amount, pierce = false) {
  const absorbed = pierce ? 0 : Math.min(unit.shield, amount);
  unit.shield -= absorbed;
  const dealt = Math.min(unit.hp, Math.max(0, amount - absorbed));
  unit.hp -= dealt;
  return dealt;
}
function nextRound(s) {
  s.round++;
  s.initiative = 1 - s.initiative;
  s.active = s.initiative;
  s.mana = [RULES.mana, RULES.mana];
  s.log.push(`Rodada ${s.round}. Mana restaurada. Equipe ${s.active + 1} tem a iniciativa.`);
  for (const team of s.teams) for (const u of team) {
    u.used = false; u.shield = 0; u.weak = false; u.marked = false;
    u.cooldown = Math.max(0, u.cooldown - 1);
    if (u.hp <= 0) continue;
    if (u.poison) { damage(u, 2, true); u.poison--; s.log.push(`${u.id}: 2 de dano de veneno.`); }
    if (s.round >= RULES.stormRound && u.hp > 0) damage(u, s.round - RULES.stormRound + 1, true);
  }
  if (s.round >= RULES.stormRound) s.log.push(`Tempestade arcana: ${s.round - RULES.stormRound + 1} de dano em cada carta viva, sem escudo.`);
  endCheck(s);
  if (s.winner === null && s.round >= RULES.maxRounds) { s.winner = 'draw'; s.log.push('Empate por limite de rodadas.'); }
}
// Pure transition: rejected actions never alter the state or consume a turn.
export function act(state, action) {
  if (!action || !legalActions(state).some(a => a.actor === action.actor && a.kind === action.kind && a.target === action.target)) throw new Error('Ação indisponível. Selecione uma carta pronta e um alvo válido.');
  const s = structuredClone(state), side = s.active;
  const u = s.teams[side][action.actor], c = catalog[u.id];
  u.used = true;
  s.history.push({ actor: action.actor, kind: action.kind, target: action.target });
  if (action.kind === 'guard') {
    u.shield = Math.max(u.shield, RULES.shield);
    s.log.push(`${u.id} defendeu: ${RULES.shield} de escudo até a próxima rodada.`);
  } else {
    const ally = action.kind === 'power' && c.target === 'ally';
    const target = s.teams[ally ? side : 1 - side][action.target];
    if (action.kind === 'power') { s.mana[side] -= c.cost; u.cooldown = RULES.cooldown; }
    if (ally) {
      const healed = Math.min(c.value, catalog[target.id].hp - target.hp);
      target.hp += healed;
      s.log.push(`${u.id} usou ${c.power}: ${target.id} recuperou ${healed} HP.`);
    } else {
      const base = action.kind === 'attack' ? c.attack : c.value;
      const weakness = u.weak ? 2 : 0;
      const amount = Math.max(0, base - weakness) + (target.marked ? 2 : 0);
      u.weak = false; target.marked = false;
      const dealt = damage(target, amount, action.kind === 'power' && ['pierce', 'siege'].includes(c.effect));
      s.log.push(`${u.id} ${action.kind === 'attack' ? 'atacou' : `usou ${c.power} contra`} ${target.id}: ${dealt} de dano${target.hp === 0 ? ' · carta derrotada' : ''}.`);
      if (action.kind === 'power') {
        if (c.effect === 'hop') {
          const other = s.teams[1 - side].reduce((lowest, candidate, index) =>
            index !== action.target && candidate.hp > 0 && (!lowest || candidate.hp < lowest.hp) ? candidate : lowest, null);
          if (other) {
            const hopAmount = Math.max(0, c.splash - weakness) + (other.marked ? 2 : 0);
            other.marked = false;
            const hopDealt = damage(other, hopAmount);
            s.log.push(`${u.id} saltou para ${other.id}: ${hopDealt} de dano${other.hp === 0 ? ' · carta derrotada' : ''}.`);
          }
        }
        if (['bulwark', 'siege'].includes(c.effect)) u.shield = Math.max(u.shield, 2);
        if (c.effect === 'poison' && target.hp > 0) target.poison = 2;
        if (c.effect === 'mark' && target.hp > 0) target.marked = true;
        if (c.effect === 'weaken' && target.hp > 0) target.weak = true;
        if (c.effect === 'drain') {
          const hurt = s.teams[side].filter(t => t.hp > 0).sort((a, b) => (catalog[b.id].hp - b.hp) - (catalog[a.id].hp - a.hp))[0];
          const healed = Math.min(3, catalog[hurt.id].hp - hurt.hp);
          hurt.hp += healed;
          s.log.push(`${hurt.id} recuperou ${healed} HP com a convergência.`);
        }
      }
    }
  }
  endCheck(s);
  if (s.winner === null) {
    if (available(s.teams[1 - side])) s.active = 1 - side;
    else if (available(s.teams[side])) s.active = side;
    else nextRound(s);
  }
  s.log = s.log.slice(-50);
  return s;
}
export function evaluate(state, side) {
  if (state.winner !== null) return state.winner === 'draw' ? 0 : state.winner === side ? 10000 : -10000;
  const score = team => team.reduce((sum, u) => sum + (u.hp <= 0 ? 0 : 12 + u.hp + catalog[u.id].attack * 1.2 + u.shield * .35 - u.poison * 1.8 - (u.weak && !u.used ? 1.2 : 0) - (u.marked ? 1.5 : 0)), 0);
  return score(state.teams[side]) - score(state.teams[1 - side]);
}
export function chooseAction(state, random = Math.random) {
  const choices = legalActions(state), side = state.active;
  // Hypothetical moves only need the board; replay and display history do not affect rules.
  const branch = { ...state, history: [], log: [] };
  let best = -Infinity, finalists = [];
  for (const action of choices) {
    const next = act(branch, action);
    // Small action-economy cost prevents spending scarce mana for no benefit.
    const score = evaluate(next, side) - (action.kind === 'power' ? catalog[state.teams[side][action.actor].id].cost * .12 : 0);
    if (score > best + .001) { best = score; finalists = [action]; }
    else if (Math.abs(score - best) < .001) finalists.push(action);
  }
  return finalists[Math.min(finalists.length - 1, Math.floor(random() * finalists.length))];
}
export function restoreMatch(raw) {
  if (!raw || raw.version !== RULES.version || !['ai', 'local'].includes(raw.mode) || !Array.isArray(raw.actions) || raw.actions.length > 120) throw new Error('Partida salva incompatível.');
  let state = createBattle(raw.teams, raw.first);
  for (const action of raw.actions) state = act(state, action);
  return { state, mode: raw.mode, first: raw.first, teams: raw.teams };
}

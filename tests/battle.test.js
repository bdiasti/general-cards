import test from 'node:test';
import assert from 'node:assert/strict';
import { createBattle, act, legalActions, chooseAction, restoreMatch } from '../src/battle.js';
import { combatCards, RULES } from '../src/combat-cards.js';

const teams = [['rag', 'keyword', 'semantic'], ['lexical', 'poison', 'contamination']];
test('equipes rejeitam cartas desconhecidas, repetidas e tamanhos inválidos', () => {
  for (const invalid of [[], ['rag'], ['rag', 'rag', 'poison'], ['rag', 'keyword', '__proto__']]) assert.throws(() => createBattle([invalid, teams[1]]));
  assert.throws(() => createBattle(teams, 2));
});
test('ataque alterna a vez, consome a ação e preserva o estado anterior', () => {
  const s = createBattle(teams);
  const next = act(s, { actor: 1, kind: 'attack', target: 0 });
  assert.equal(next.teams[1][0].hp, combatCards.lexical.hp - 4);
  assert.equal(next.active, 1); assert.equal(next.teams[0][1].used, true);
  assert.equal(s.teams[1][0].hp, combatCards.lexical.hp);
  assert.deepEqual(next.mana, [3, 3]);
});
test('mana compartilhada, recarga e ações repetidas são validadas', () => {
  let s = createBattle(teams);
  s = act(s, { actor: 2, kind: 'power', target: 0 });
  assert.equal(s.mana[0], 1); assert.equal(s.teams[0][2].cooldown, 2);
  s = act(s, { actor: 0, kind: 'guard', target: 0 });
  assert.throws(() => act(s, { actor: 2, kind: 'attack', target: 0 }));
  assert.ok(legalActions(s).some(a => a.actor === 1 && a.kind === 'power'));
  s.mana[0] = 0;
  assert.ok(legalActions(s).every(a => a.kind !== 'power'));
});
test('escudo absorve dano, mas o fio astral o ignora', () => {
  let s = createBattle(teams, 1);
  s = act(s, { actor: 0, kind: 'guard', target: 0 });
  const hit = act(s, { actor: 1, kind: 'attack', target: 0 });
  assert.equal(hit.teams[1][0].hp, combatCards.lexical.hp - 1);
  assert.equal(hit.teams[1][0].shield, 0);
  const pierced = act(s, { actor: 2, kind: 'power', target: 0 });
  assert.equal(pierced.teams[1][0].hp, combatCards.lexical.hp - 6);
  assert.equal(pierced.teams[1][0].shield, 3);
});
test('cura exige alvo ferido vivo e nunca ultrapassa o HP máximo', () => {
  const s = createBattle(teams);
  assert.ok(!legalActions(s).some(a => a.actor === 0 && a.kind === 'power'));
  s.teams[0][1].hp -= 2;
  const next = act(s, { actor: 0, kind: 'power', target: 1 });
  assert.equal(next.teams[0][1].hp, combatCards.keyword.hp);
  s.teams[0][1].hp = 0;
  assert.throws(() => act(s, { actor: 0, kind: 'power', target: 1 }));
});
test('rodada renova mana, alterna iniciativa, expira efeitos e bloqueia poder na próxima rodada', () => {
  let s = createBattle(teams);
  s.teams[0][0].hp -= 3;
  s = act(s, { actor: 0, kind: 'power', target: 0 });
  s.teams[0][0].weak = true; s.teams[0][0].marked = true;
  while (s.round === 1) s = act(s, legalActions(s).find(a => a.kind === 'guard'));
  assert.equal(s.active, 1); assert.deepEqual(s.mana, [3, 3]);
  assert.equal(s.teams[0][0].cooldown, 1);
  assert.equal(s.teams[0][0].weak, false); assert.equal(s.teams[0][0].marked, false);
  assert.ok(s.teams.flat().every(u => !u.used && u.shield === 0));
  while (s.round === 2) s = act(s, legalActions(s).find(a => a.kind === 'guard'));
  assert.equal(s.teams[0][0].cooldown, 0); assert.equal(s.active, 0);
});
test('veneno dura duas rodadas, ignora escudo e não acumula', () => {
  let s = createBattle(teams, 1);
  s.teams[0][0].poison = 1;
  s = act(s, { actor: 1, kind: 'power', target: 0 });
  assert.equal(s.teams[0][0].poison, 2);
  const hp = s.teams[0][0].hp;
  while (s.round < 3) s = act(s, legalActions(s).find(a => a.kind === 'guard'));
  assert.equal(s.teams[0][0].poison, 0); assert.equal(s.teams[0][0].hp, hp - 4);
});
test('marca aumenta só o próximo golpe, fraqueza reduz só o próximo golpe', () => {
  let s = createBattle([['agent', 'keyword', 'rag'], teams[1]]);
  s = act(s, { actor: 0, kind: 'power', target: 0 });
  assert.equal(s.teams[1][0].marked, true);
  s = act(s, { actor: 2, kind: 'power', target: 1 });
  assert.equal(s.teams[0][1].weak, true);
  const hp = s.teams[1][0].hp;
  s = act(s, { actor: 1, kind: 'attack', target: 0 });
  assert.equal(s.teams[1][0].hp, hp - 4); // 4 - 2 + 2
  assert.equal(s.teams[1][0].marked, false); assert.equal(s.teams[0][1].weak, false);
});
test('convergência cura o aliado mais ferido e não ressuscita', () => {
  const s = createBattle([['hybrid', 'rag', 'keyword'], teams[1]]);
  s.teams[0][1].hp = 0; s.teams[0][2].hp = 4;
  const next = act(s, { actor: 0, kind: 'power', target: 0 });
  assert.equal(next.teams[0][1].hp, 0); assert.equal(next.teams[0][2].hp, 7);
});
test('derrotados não agem, vitória encerra imediatamente, ações seguintes são rejeitadas', () => {
  const s = createBattle(teams);
  s.teams[1].forEach((u, i) => { u.hp = i ? 0 : 1; });
  const next = act(s, { actor: 0, kind: 'attack', target: 0 });
  assert.equal(next.winner, 0); assert.deepEqual(legalActions(next), []);
  assert.throws(() => act(next, { actor: 1, kind: 'guard', target: 1 }));
});
test('tempestade resolve quedas simultâneas como empate e impede defesa infinita', () => {
  let s = createBattle([teams[0], teams[0]]);
  while (s.winner === null) s = act(s, legalActions(s).find(a => a.kind === 'guard'));
  assert.equal(s.winner, 'draw'); assert.ok(s.round <= RULES.maxRounds);
});
test('replay reproduz o duelo e rejeita estado adulterado ou incompatível', () => {
  let s = createBattle(teams);
  for (let i = 0; i < 12; i++) s = act(s, chooseAction(s, () => .5));
  const raw = { version: RULES.version, mode: 'local', teams, first: 0, actions: s.history };
  assert.deepEqual(restoreMatch(raw).state, s);
  assert.throws(() => restoreMatch({ ...raw, version: 99 }));
  assert.throws(() => restoreMatch({ ...raw, actions: [{ actor: 15, kind: 'attack', target: 0 }] }));
});

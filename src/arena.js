import { cards } from './cards.js';
import { RULES } from './combat-cards.js';
import { createBattle, act, legalActions, chooseAction, restoreMatch } from './battle.js';

const root = document.querySelector('#arena-content');
const live = document.querySelector('#arena-announcement');
const key = 'arcana.battle.v1';
const byId = Object.fromEntries(cards.map(c => [c.id, c]));
let mode = 'ai', draftSide = 0, teams = [[], []], match = null, first = 0;
let selected = null, kind = 'attack', timer, savedMatch, notice = '';
try { const raw = JSON.parse(localStorage.getItem(key)); if (raw) { restoreMatch(raw); savedMatch = raw; } } catch { /* Invalid or unavailable storage does not block play. */ }
const name = side => mode === 'ai' ? (side ? 'Conselho Arcano' : 'Sua companhia') : `Jogador ${side + 1}`;
const stats = c => `<span class="stat-hp">${c.combat.hp} <small>HP</small></span><span>${c.combat.attack} <small>ATQ</small></span><span>${c.combat.cost} <small>MANA</small></span>`;
const cardIdPattern = new RegExp(`\\b(${cards.map(c => c.id).join('|')})\\b`, 'g');
const namesIn = text => text.replace(cardIdPattern, id => byId[id].name);
function announce(message) { live.textContent = namesIn(message); }
function save() {
  const raw = { version: RULES.version, mode, teams, first, actions: match.history };
  try { localStorage.setItem(key, JSON.stringify(raw)); savedMatch = raw; } catch { notice = 'O navegador não permitiu salvar. A partida continua nesta aba.'; }
}
function restoreFocus(focusKey) {
  if (focusKey) root.querySelector(`[data-focus="${focusKey}"]`)?.focus({ preventScroll: true });
}
function renderDraft(focusKey) {
  const chosen = teams[draftSide];
  root.innerHTML = `<div class="arena-lobby">
    <div class="arena-intro"><div><span class="arena-kicker">DUELOS TÁTICOS · 3 CONTRA 3</span><h3>Monte sua companhia.</h3><p>Três cartas. Uma estratégia. Escolha seus aliados e transforme conhecimento em poder.</p></div><div class="arena-format"><b>${cards.length} cartas livres</b><span>Sem compras. Sem vantagem por raridade.</span></div></div>
    <div class="arena-config"><div class="mode-switch" role="group" aria-label="Modo de jogo"><button data-mode="ai" data-focus="mode-ai" aria-pressed="${mode === 'ai'}">Contra o computador</button><button data-mode="local" data-focus="mode-local" aria-pressed="${mode === 'local'}">2 jogadores locais</button></div>${savedMatch ? '<button class="arena-secondary" data-arena="resume">Retomar último duelo</button>' : ''}</div>
    <div class="draft-heading"><h4>${mode === 'local' ? `Equipe do jogador ${draftSide + 1}` : 'Escolha sua equipe'}</h4><span>${chosen.length} / 3 escolhidas · 1 vaga por carta</span></div>
    <div class="draft-grid">${cards.map(c => `<button class="draft-card ${chosen.includes(c.id) ? 'is-chosen' : ''}" data-pick="${c.id}" data-focus="pick-${c.id}" aria-pressed="${chosen.includes(c.id)}" ${chosen.length === 3 && !chosen.includes(c.id) ? 'disabled' : ''} aria-label="${chosen.includes(c.id) ? 'Remover' : 'Selecionar'} ${c.name}, ${c.combat.hp} HP, ${c.combat.attack} ataque, ${c.combat.role}"><img src="/public/art/${c.art}.png" alt="" loading="lazy" width="100" height="130"><span class="draft-copy"><span class="draft-role">${c.combat.role}${chosen.includes(c.id) ? ' · SELECIONADA' : ''}</span><strong>${c.name}</strong><span class="combat-stats">${stats(c)}</span><span class="draft-power"><b>${c.combat.power}</b> ${c.combat.text}</span></span></button>`).join('')}</div>
    <div class="draft-footer"><p id="draft-hint">${mode === 'local' ? 'O mesmo aparelho passa de mão a cada ação. As duas equipes ficam visíveis.' : 'O Conselho usa as mesmas regras e escolhe uma equipe aleatória de três cartas.'}</p><div><button class="arena-secondary" data-arena="suggest">Sugerir equipe</button>${draftSide === 1 ? '<button class="arena-secondary" data-arena="back">Voltar à equipe 1</button>' : ''}<button class="primary-btn" data-arena="start" ${chosen.length !== 3 ? 'disabled' : ''}>${mode === 'local' && draftSide === 0 ? 'Montar equipe 2' : 'Iniciar duelo'} <span aria-hidden="true">→</span></button></div></div>
    <p class="arena-note">Atacar é grátis. Poderes dividem 3 de mana por equipe a cada rodada. Todos começam com HP completo.</p>
  </div>`;
  restoreFocus(focusKey);
}
function unitMarkup(u, index, side, actions, humanTurn) {
  const c = byId[u.id];
  const target = selected !== null && actions.some(a => a.actor === selected && a.kind === kind && a.target === index) && side === (kind === 'power' && byId[match.teams[match.active][selected].id].combat.target === 'ally' ? match.active : 1 - match.active);
  const selectable = humanTurn && side === match.active && !u.used && u.hp > 0;
  const enabled = humanTurn && (target || selectable);
  const status = u.hp <= 0 ? 'Derrotada' : u.used ? 'Já agiu' : 'Pronta';
  return `<button class="battle-unit ${side === match.active && selected === index ? 'is-selected' : ''} ${target && humanTurn ? 'is-target' : ''} ${u.hp <= 0 ? 'is-defeated' : ''}" data-unit="${index}" data-side="${side}" data-focus="unit-${side}-${index}" ${enabled ? '' : 'disabled'} aria-label="${target && humanTurn ? 'Alvo: ' : ''}${c.name}, ${u.hp} de ${c.combat.hp} HP, ${status}">
    <span class="unit-art"><img src="/public/art/${c.art}.png" alt="" width="220" height="150"><span class="unit-role">${c.combat.role}</span><span class="unit-state">${target && humanTurn ? 'SELECIONAR ALVO' : status}</span></span>
    <span class="unit-info"><strong>${c.name}</strong><span class="unit-health"><span>HP <b>${u.hp}</b> / ${c.combat.hp}</span><span>ATQ <b>${c.combat.attack}${u.weak ? ' −2' : ''}</b></span></span><span class="hp-track"><span style="width:${u.hp / c.combat.hp * 100}%"></span></span><span class="unit-effects">${u.shield ? `Escudo ${u.shield} · ` : ''}${u.poison ? `Veneno ${u.poison} rod. · ` : ''}${u.marked ? 'Marcada +2 · ' : ''}${u.weak ? 'Enfraquecida · ' : ''}${u.hp <= 0 ? 'Fora de combate' : u.cooldown ? `Poder: ${u.cooldown === 2 ? 'recarga iniciada' : 'recarga nesta rodada'}` : `Poder: ${c.combat.cost} mana`}</span></span>
  </button>`;
}
function renderMatch(focusKey) {
  const humanTurn = match.winner === null && !(mode === 'ai' && match.active === 1);
  const actions = legalActions(match);
  if (selected !== null && !actions.some(a => a.actor === selected)) selected = null;
  const actor = selected === null ? null : match.teams[match.active][selected];
  const c = actor && byId[actor.id];
  const powerReady = actor && actions.some(a => a.actor === selected && a.kind === 'power');
  const finished = match.winner !== null;
  const winnerText = match.winner === 'draw' ? 'Um duelo à altura. Empate!' : `${name(match.winner)} venceu!`;
  const instruction = finished ? winnerText : !humanTurn ? 'O Conselho está escolhendo sua ação…' : selected === null ? `${name(match.active)}: escolha uma carta pronta.` : kind === 'power' && c.combat.target === 'ally' ? 'Escolha um aliado ferido para curar.' : `Escolha um inimigo para ${kind === 'power' ? 'usar o poder' : 'atacar'}.`;
  root.innerHTML = `<div class="arena-match">
    <div class="match-top"><div><span class="arena-kicker">${mode === 'ai' ? 'VOCÊ × CONSELHO ARCANO' : 'DUELO LOCAL · MESMO APARELHO'}</span><h3 tabindex="-1" id="match-heading">${finished ? winnerText : `Rodada ${match.round}`}</h3></div><div class="match-top-actions"><span class="round-badge">${finished ? 'Duelo encerrado' : `Vez: ${name(match.active)}`}</span><button class="arena-secondary" data-arena="lobby">Montar outra equipe</button></div></div>
    ${notice ? `<p class="arena-warning">${notice}</p>` : ''}
    ${finished ? `<div class="match-result"><p>${match.winner === 'draw' ? 'As equipes resistiram até o limite.' : 'Experimente outra formação ou troque a ordem dos seus poderes.'} Duelo concluído em ${match.round} rodadas.</p><button class="primary-btn" data-arena="rematch">Revanche · alternar iniciativa</button></div>` : ''}
    <div class="arena-layout"><div class="battlefield">
      ${[1, 0].map(side => `<div class="team-zone ${match.active === side && !finished ? 'active-team' : ''}"><div class="team-label"><h4>${name(side)}</h4><span>${match.teams[side].filter(u => u.hp > 0).length}/3 vivas <span class="mana-readout">${match.mana[side]} / 3 mana</span></span></div><div class="battle-row">${match.teams[side].map((u, i) => unitMarkup(u, i, side, actions, humanTurn)).join('')}</div></div>${side === 1 ? `<div class="battle-divider"><span></span><b>${match.round >= RULES.stormRound ? `TEMPESTADE · ${match.round - RULES.stormRound + 1} DANO / RODADA` : 'ARENA DOS SABERES'}</b><span></span></div>` : ''}`).join('')}
    </div><aside class="battle-console" aria-label="Comandos do duelo"><div class="turn-instruction" id="turn-instruction">${instruction}</div>
      ${humanTurn && c ? `<div class="selected-summary"><span class="arena-kicker">CARTA ATIVA</span><h4>${c.name}</h4><p>${c.combat.power}: ${c.combat.text}</p></div><div class="battle-actions"><button class="arena-action ${kind === 'attack' ? 'chosen-action' : ''}" data-command="attack" data-focus="cmd-attack" aria-pressed="${kind === 'attack'}"><strong>Atacar</strong><span>${Math.max(0, c.combat.attack - (actor.weak ? 2 : 0))} de dano · grátis</span></button><button class="arena-action ${kind === 'power' ? 'chosen-action' : ''}" data-command="power" data-focus="cmd-power" aria-pressed="${kind === 'power'}" ${powerReady ? '' : 'disabled'}><strong>Usar poder</strong><span>${actor.cooldown ? 'Em recarga' : match.mana[match.active] < c.combat.cost ? 'Mana insuficiente' : !powerReady ? 'Nenhum aliado ferido' : `${c.combat.cost} mana · recarrega 1 rodada`}</span></button><button class="arena-action" data-command="guard" data-focus="cmd-guard"><strong>Defender</strong><span>3 de escudo nesta rodada · grátis</span></button></div><button class="text-btn" data-arena="cancel">Escolher outra carta</button>` : `<div class="arena-tip"><span class="arena-kicker">${finished ? 'PRÓXIMA ESTRATÉGIA' : 'DICA DO CONSELHO'}</span><p>Proteja cartas feridas, concentre seus ataques e reserve mana para uma combinação. Uma carta derrotada perde sua ação.</p></div>`}
      <details class="battle-history" open><summary>Registro do duelo</summary><ol>${match.log.slice(-8).reverse().map(line => `<li>${namesIn(line)}</li>`).join('')}</ol></details>
    </aside></div><p class="arena-note">Escudos, marcas e fraqueza expiram na próxima rodada. A partir da rodada 9, a tempestade causa dano crescente em todos.</p>
  </div>`;
  restoreFocus(focusKey);
  if (finished) document.querySelector('#match-heading').focus({ preventScroll: true });
  else if (!focusKey) root.querySelector('.battle-unit:not(:disabled)')?.focus({ preventScroll: true });
}
function scheduleAI() {
  clearTimeout(timer);
  if (!match || match.winner !== null || mode !== 'ai' || match.active !== 1) return;
  timer = setTimeout(() => {
    if (!match || match.winner !== null || mode !== 'ai' || match.active !== 1) return;
    perform(chooseAction(match));
  }, 850);
}
function perform(action) {
  try {
    const previous = match.history.length;
    match = act(match, action); selected = null; kind = 'attack';
    save(); renderMatch();
    announce(`${match.log.slice(-2).join(' ')} ${match.winner !== null ? 'Fim de partida.' : `Vez de ${name(match.active)}.`}`);
    if (match.history.length !== previous) scheduleAI();
  } catch (error) { announce(error.message); }
}
function randomTeam() {
  const ids = cards.map(c => c.id);
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  return ids.slice(0, 3);
}
function start() {
  clearTimeout(timer); selected = null; kind = 'attack'; notice = '';
  match = createBattle(teams, first); save(); renderMatch();
  document.querySelector('#match-heading').focus({ preventScroll: true });
  document.querySelector('#arena').scrollIntoView({ behavior: 'instant', block: 'start' });
  announce(`Duelo iniciado. ${name(first)} começa. Escolha uma carta pronta.`); scheduleAI();
}
root.addEventListener('click', e => {
  const button = e.target.closest('button'); if (!button || button.disabled) return;
  if (button.dataset.mode) { mode = button.dataset.mode; draftSide = 0; renderDraft(button.dataset.focus); return; }
  if (button.dataset.pick) {
    const id = button.dataset.pick, chosen = teams[draftSide];
    if (chosen.includes(id)) teams[draftSide] = chosen.filter(x => x !== id);
    else if (chosen.length < 3) chosen.push(id);
    renderDraft(button.dataset.focus); announce(`${teams[draftSide].length} de 3 cartas selecionadas.`); return;
  }
  const action = button.dataset.arena;
  if (action === 'suggest') { teams[draftSide] = randomTeam(); renderDraft(); announce('Equipe sugerida. Você pode trocar qualquer carta.'); }
  if (action === 'back') { draftSide = 0; renderDraft(); }
  if (action === 'start') {
    if (mode === 'local' && draftSide === 0) { draftSide = 1; renderDraft(); announce('Agora escolha as cartas do jogador 2.'); return; }
    if (mode === 'ai') teams[1] = randomTeam();
    first = Math.random() < .5 ? 0 : 1; start();
  }
  if (action === 'resume' && savedMatch) {
    try { const restored = restoreMatch(savedMatch); match = restored.state; mode = restored.mode; first = restored.first; teams = restored.teams; selected = null; kind = 'attack'; renderMatch(); scheduleAI(); announce('Duelo retomado.'); }
    catch { savedMatch = null; renderDraft(); announce('Não foi possível recuperar esse duelo. Monte uma nova equipe.'); }
  }
  if (action === 'lobby') { clearTimeout(timer); match = null; selected = null; draftSide = 0; teams = [[], []]; renderDraft(); announce('Último duelo salvo. Monte outra equipe ou retome a partida.'); }
  if (action === 'rematch') { first = 1 - first; start(); }
  if (action === 'cancel') { selected = null; kind = 'attack'; renderMatch(); }
  if (!match || match.winner !== null || (mode === 'ai' && match.active === 1)) return;
  if (button.dataset.command && selected !== null) {
    if (button.dataset.command === 'guard') { perform({ actor: selected, kind: 'guard', target: selected }); return; }
    kind = button.dataset.command; renderMatch(button.dataset.focus);
    announce(kind === 'power' && byId[match.teams[match.active][selected].id].combat.target === 'ally' ? 'Selecione um aliado ferido.' : 'Selecione uma carta inimiga como alvo.');
  }
  if (button.dataset.unit !== undefined) {
    const index = Number(button.dataset.unit), side = Number(button.dataset.side);
    if (selected !== null) {
      const c = byId[match.teams[match.active][selected].id];
      const targetSide = kind === 'power' && c.combat.target === 'ally' ? match.active : 1 - match.active;
      const action = { actor: selected, kind, target: index };
      if (side === targetSide && legalActions(match).some(a => a.actor === selected && a.kind === kind && a.target === index)) { perform(action); return; }
    }
    const u = match.teams[side][index];
    if (side === match.active && u.hp > 0 && !u.used) { selected = index; kind = 'attack'; renderMatch(button.dataset.focus); announce(`${byId[u.id].name} selecionada. Escolha ataque, poder ou defesa.`); }
  }
});
renderDraft();

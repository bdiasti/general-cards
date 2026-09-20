import { cards, sources, selectCards, sanitizeSaved } from './cards.js';

const icons = {
  book: '<path d="M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Zm0 0v16"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5Z"/>',
  spark: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  mountain: '<path d="m2 20 7-14 5 9 3-5 5 10ZM6 12l3 2 3-2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z"/><path d="m8 12 3 3 5-6"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const hydrateIcons = () => document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
const storageKey = 'arcana.grimoire.v1';
let saved = [];
try { saved = sanitizeSaved(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch { /* A coleção continua disponível sem armazenamento. */ }
const state = { query: '', type: 'Todos', sort: 'number', savedOnly: false, saved };
const dialog = document.querySelector('#detail-dialog');
let currentCard = null;
let toastTimer;
let dialogTrigger = null;

function cardMarkup(card, hero = false) {
  return `<article class="tcg-card ${card.color} ${hero ? 'hero-card' : ''}">
    <button class="card-open" data-card="${card.id}" aria-label="Conhecer ${escape(card.name)} — ${escape(card.concept)}">
      <div class="card-art"><img src="/public/art/${card.art}.png" alt="${escape(card.name)}: ${escape(card.lineage)}" width="1024" height="1536" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"><div class="art-shade"></div><div class="card-identity"><span class="card-type">${card.type}</span><h3>${card.name}</h3></div></div>
      <div class="card-top"><span class="card-faction">${icon('spark')} ENGENHARIA DE IA</span><span class="mana" aria-label="Poder custa ${card.cost} de mana">${card.cost}</span></div>
      <div class="card-parchment"><div class="concept-line"><span>${icon(card.type === 'Maldição' ? 'shield' : 'spark')}</span><h4>${card.concept}</h4></div><p>${card.summary}</p><div class="card-flavor">${card.flavor}</div></div>
      <div class="card-combat"><span class="stat-hp">${card.combat.hp} <small>HP</small></span><span>${card.combat.attack} <small>ATQ</small></span><span>${card.cost} <small>MANA</small></span></div>
      <div class="card-bottom"><span class="rarity"><span aria-hidden="true">${card.rarity === 'Lendária' ? '✦' : '◆'}</span> ${card.rarity}</span><span>ARC · ${String(card.number).padStart(3, '0')} / ${String(cards.length).padStart(3, '0')}</span></div>
    </button>
    ${hero ? '' : `<button class="save-card ${saved.includes(card.id) ? 'saved' : ''}" data-save="${card.id}" aria-label="${saved.includes(card.id) ? 'Remover' : 'Adicionar'} ${escape(card.name)} ${saved.includes(card.id) ? 'do' : 'ao'} grimório" aria-pressed="${saved.includes(card.id)}">${icon(saved.includes(card.id) ? 'check' : 'bookmark')}</button>`}
  </article>`;
}

function renderGrid() {
  const filtered = selectCards(state);
  document.querySelector('#card-grid').innerHTML = filtered.map(c => cardMarkup(c)).join('');
  document.querySelector('#result-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'carta encontrada' : 'cartas encontradas'}`;
  document.querySelector('#saved-count').textContent = saved.length;
  document.querySelector('#collection-title').textContent = state.savedOnly ? 'Meu grimório' : 'Explore o grimório';
  document.querySelector('#empty').hidden = filtered.length > 0;
  document.querySelector('#empty-message').textContent = state.savedOnly && !saved.length ? 'Guarde suas primeiras cartas usando o marcador na coleção.' : 'Tente outro termo ou remova os filtros para encontrar seu próximo saber.';
  document.querySelectorAll('[data-type]').forEach(b => { b.classList.toggle('active', state.type === b.dataset.type); b.setAttribute('aria-pressed', String(state.type === b.dataset.type)); });
  document.querySelector('.grimoire-btn').classList.toggle('selected', state.savedOnly);
  document.querySelector('[data-view="all"]').classList.toggle('active', !state.savedOnly);
}

function toast(message) {
  const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3400);
}

function toggleSave(id) {
  if (!cards.some(c => c.id === id)) return;
  saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
  state.saved = saved;
  let persistent = true;
  try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { persistent = false; }
  renderGrid();
  if (currentCard === id && dialog.open) updateDetailSave(id);
  toast(persistent ? (saved.includes(id) ? 'Carta adicionada ao seu grimório.' : 'Carta removida do seu grimório.') : 'Alteração feita nesta sessão. O navegador não permitiu salvar.');
}

function updateDetailSave(id) {
  const b = document.querySelector('#detail-save'); if (!b) return;
  b.innerHTML = `${icon(saved.includes(id) ? 'check' : 'bookmark')} ${saved.includes(id) ? 'No seu grimório · remover' : 'Adicionar ao grimório'}`;
  b.setAttribute('aria-pressed', String(saved.includes(id)));
}

function showDialog(html) {
  if (!dialog.open) dialogTrigger = document.activeElement;
  document.querySelector('#dialog-content').innerHTML = html;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
  dialog.querySelector('.close-btn').focus();
}

function showCard(id, updateUrl = true) {
  const c = cards.find(x => x.id === id); if (!c) return;
  currentCard = id;
  const source = sources[c.source];
  showDialog(`<div class="detail-layout"><aside class="detail-visual">${cardMarkup(c, true)}<p class="detail-edition">PRIMEIRA EDIÇÃO · CARTA ${String(c.number).padStart(3, '0')}</p><button class="primary-btn" id="detail-save" data-save="${c.id}"></button><button class="text-btn share-btn" data-share="${c.id}">${icon('layers')} Copiar link da carta</button></aside><div class="detail-copy"><div class="eyebrow">${c.lineage}</div><h2 id="dialog-title">${c.name}</h2><p class="detail-subtitle">${c.concept} <span>·</span> ${c.type}</p><div class="detail-tabs" role="tablist" aria-label="Conteúdo da carta"><button role="tab" id="tab-lore" aria-controls="panel-lore" aria-selected="true" data-tab="lore">A lenda</button><button role="tab" id="tab-concept" aria-controls="panel-concept" aria-selected="false" tabindex="-1" data-tab="concept">O conceito real</button><button role="tab" id="tab-challenge" aria-controls="panel-challenge" aria-selected="false" tabindex="-1" data-tab="challenge">Teste seu saber</button></div><section id="panel-lore" role="tabpanel" aria-labelledby="tab-lore" tabindex="0"><blockquote>${c.flavor}</blockquote><h3>Nos registros de Arcana</h3><p>${c.lore}</p><div class="knowledge-callout">${icon('book')}<div><h4>A magia no mundo real</h4><p>${c.explanation}</p></div></div><div class="combat-detail"><h3>${c.combat.power}</h3><p><b>${c.combat.hp} HP · ${c.combat.attack} de ataque · ${c.cost} mana</b></p><p>${c.mechanic}</p><a href="#arena" data-action="arena">Jogar com esta coleção →</a></div></section><section id="panel-concept" role="tabpanel" aria-labelledby="tab-concept" tabindex="0" hidden><h3>${c.subtitle}</h3><p>${c.explanation}</p><h3>Na prática</h3><p>${c.example}</p><div class="limit-callout"><h4>Onde a analogia termina</h4><p>${c.limit}</p></div><h3>Continue a descoberta</h3><a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title} ↗</a><p class="prototype-note">Fonte consultada em 20/09/2026 · Conteúdo editorial v0.1</p></section><section id="panel-challenge" role="tabpanel" aria-labelledby="tab-challenge" tabindex="0" hidden><div class="eyebrow challenge-label">DESAFIO DE CONHECIMENTO</div><h3>${c.quiz.question}</h3><div class="quiz-options">${c.quiz.options.map((o, i) => `<button data-answer="${i}"><span>${String.fromCharCode(65 + i)}</span>${o}</button>`).join('')}</div><p id="quiz-feedback" role="status"></p><button class="text-btn" data-action="retry" hidden>Tentar novamente ${icon('arrow')}</button></section><div class="related"><h4>Saberes conectados</h4><div>${c.related.map(id => `<button data-card="${id}">${cards.find(x => x.id === id).concept} ${icon('arrow')}</button>`).join('')}</div></div></div></div>`);
  updateDetailSave(id);
  if (updateUrl && location.hash !== `#carta/${id}`) history.pushState(null, '', `#carta/${id}`);
}

function showGuide() {
  currentCard = null;
  showDialog(`<div class="info-dialog"><div class="eyebrow">BEM-VINDO A ARCANA</div><h2 id="dialog-title">Uma jornada, muitos saberes.</h2><p class="info-intro">A imaginação abre a porta. O conhecimento permite atravessá-la.</p><ol class="guide-steps"><li><span>01</span><div><h3>Encontre seu reino</h3><p>Cada raça representa uma área de conhecimento. Começamos com Engenharia de IA: os Arquitetos do Invisível.</p></div></li><li><span>02</span><div><h3>Descubra os dois lados da magia</h3><p>Abra uma carta para ler sua lenda, entender o conceito real e conhecer os limites da analogia.</p></div></li><li><span>03</span><div><h3>Teste e colecione</h3><p>Responda ao desafio e salve seus saberes favoritos no grimório. Sua seleção fica neste navegador.</p></div></li></ol><div class="limit-callout"><h4>O primeiro capítulo</h4><p>Além de colecionar, você pode jogar duelos de 3 contra 3 na Arena dos Saberes, contra o computador ou com um amigo no mesmo aparelho. Cada carta tem HP, ataque e um poder. Raridade não dá bônus no combate e não representa a importância de um conceito.</p></div><button class="primary-btn" data-action="explore">Encontrar minha primeira carta ${icon('arrow')}</button></div>`);
}

function showRealms() {
  currentCard = null;
  showDialog(`<div class="info-dialog"><div class="eyebrow">ATLAS DO CONHECIMENTO</div><h2 id="dialog-title">Os reinos de Arcana</h2><p class="info-intro">Cada domínio do mundo real encontra uma linhagem na fantasia.</p><div class="realm-feature">${icon('spark')}<div><span class="eyebrow">DISPONÍVEL · ${cards.length} CARTAS</span><h3>Os Arquitetos do Invisível</h3><p>Engenharia de IA reúne elfos arquivistas, anões das runas, oráculos e patrulheiros. Cada linhagem revela uma maneira de trabalhar com informação.</p><button class="text-btn" data-action="explore">Explorar Engenharia de IA ${icon('arrow')}</button></div></div><h3>Territórios em estudo</h3><div class="future-list"><p><b>Forjadores de Sistemas</b><span>Engenharia de software</span></p><p><b>Guardiões dos Selos</b><span>Segurança da informação</span></p><p><b>Cartógrafos do Acaso</b><span>Estatística e ciência de dados</span></p></div><p class="prototype-note">Propostas de expansão, ainda sem cartas. Os próximos reinos serão definidos junto com você.</p></div>`);
}

function closeDialog() { dialog.close(); }
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open'); currentCard = null;
  if (location.hash.startsWith('#carta/')) history.replaceState(null, '', '#colecao');
  if (dialogTrigger?.isConnected) dialogTrigger.focus();
  else document.querySelector('#search').focus({ preventScroll: true });
});
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(); } });

function setView(savedOnly = false) {
  state.savedOnly = savedOnly; state.query = ''; state.type = 'Todos';
  document.querySelector('#search').value = '';
  renderGrid(); document.querySelector('#colecao').scrollIntoView({ behavior: 'smooth' });
}
function changeTab(name) {
  document.querySelectorAll('[data-tab]').forEach(b => { const selected = b.dataset.tab === name; b.setAttribute('aria-selected', String(selected)); b.tabIndex = selected ? 0 : -1; });
  document.querySelectorAll('[role="tabpanel"]').forEach(p => { p.hidden = p.id !== `panel-${name}`; });
}
document.addEventListener('click', async e => {
  const save = e.target.closest('[data-save]'); if (save) { toggleSave(save.dataset.save); return; }
  const card = e.target.closest('[data-card]'); if (card) { showCard(card.dataset.card); return; }
  const tab = e.target.closest('[data-tab]'); if (tab) { changeTab(tab.dataset.tab); return; }
  const filter = e.target.closest('[data-type]'); if (filter) { state.type = filter.dataset.type; renderGrid(); return; }
  const answer = e.target.closest('[data-answer]');
  if (answer && currentCard) {
    const c = cards.find(c => c.id === currentCard); const correct = Number(answer.dataset.answer) === c.quiz.answer;
    document.querySelectorAll('[data-answer]').forEach(b => { b.disabled = true; if (Number(b.dataset.answer) === c.quiz.answer) b.classList.add('correct'); });
    answer.classList.add(correct ? 'correct' : 'incorrect');
    document.querySelector('#quiz-feedback').textContent = `${correct ? 'Muito bem!' : 'Ainda não.'} ${c.quiz.feedback}`;
    document.querySelector('[data-action="retry"]').hidden = false; return;
  }
  const share = e.target.closest('[data-share]'); if (share) { const url = `${location.origin}/#carta/${share.dataset.share}`; try { await navigator.clipboard.writeText(url); toast('Link da carta copiado.'); } catch { toast('Copie o endereço da carta na barra do navegador.'); } return; }
  if (e.target.closest('[data-view="all"]')) setView(false);
  const action = e.target.closest('[data-action]')?.dataset.action;
  if (action === 'close') closeDialog();
  if (action === 'arena' && dialog.open) closeDialog();
  if (action === 'guide') showGuide();
  if (action === 'realms') showRealms();
  if (action === 'grimoire') setView(true);
  if (['all', 'ai', 'reset', 'explore'].includes(action)) {
    if (dialog.open) closeDialog(); setView(false);
    document.querySelectorAll('.realm-tab').forEach(b => b.classList.toggle('selected', b.dataset.action === (action === 'ai' ? 'ai' : 'all')));
  }
  if (action === 'retry') { document.querySelectorAll('[data-answer]').forEach(b => { b.disabled = false; b.classList.remove('correct', 'incorrect'); }); document.querySelector('#quiz-feedback').textContent = ''; document.querySelector('[data-action="retry"]').hidden = true; document.querySelector('[data-answer]').focus(); }
});
document.querySelector('#search').addEventListener('input', e => { state.query = e.target.value; renderGrid(); });
document.querySelector('#sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
document.addEventListener('keydown', e => {
  if (e.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { e.preventDefault(); document.querySelector('#search').focus(); }
  if (e.target.matches('[role="tab"]') && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
    e.preventDefault(); const tabs = [...document.querySelectorAll('[role="tab"]')]; const i = tabs.indexOf(e.target);
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    changeTab(tabs[next].dataset.tab); tabs[next].focus();
  }
});
function readHash() { const id = location.hash.match(/^#carta\/([a-z]+)$/)?.[1]; if (id && cards.some(c => c.id === id)) showCard(id, false); else if (dialog.open) closeDialog(); }
window.addEventListener('popstate', readHash);
window.addEventListener('hashchange', readHash);
window.addEventListener('storage', e => { if (e.key === storageKey || e.key === null) { try { saved = sanitizeSaved(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch { saved = []; } state.saved = saved; renderGrid(); if (currentCard) updateDetailSave(currentCard); } });
document.querySelector('#hero-cards').innerHTML = [cards[1], cards[0], cards.find(c => c.id === 'hnsw')].map(c => cardMarkup(c, true)).join('');
document.querySelectorAll('[data-card-count]').forEach(el => { el.textContent = String(cards.length).padStart(Number(el.dataset.cardCount) || 1, '0'); });
hydrateIcons(); renderGrid(); readHash();

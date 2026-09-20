import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { cards, sources, selectCards, sanitizeSaved } from '../src/cards.js';

test('cada carta possui identidade única, arte, fonte e todos os componentes educacionais', async () => {
  assert.equal(new Set(cards.map(c => c.id)).size, cards.length);
  assert.equal(new Set(cards.map(c => c.number)).size, cards.length);
  for (const c of cards) {
    for (const field of ['concept', 'lore', 'explanation', 'example', 'limit', 'mechanic', 'lineage']) assert.ok(c[field]?.trim().length > 0, `${c.id}: ${field}`);
    assert.ok(sources[c.source]?.url.startsWith('https://'));
    assert.ok(c.related.every(id => cards.some(other => other.id === id)));
    assert.ok(c.quiz.answer >= 0 && c.quiz.answer < c.quiz.options.length);
    assert.equal(c.quiz.options.length, new Set(c.quiz.options).size);
    await access(new URL(`../public/art/${c.art}.png`, import.meta.url));
  }
});
test('busca ignora acentos e caixa, aceita múltiplos termos e consulta conceito e habilidade', () => {
  assert.deepEqual(selectCards({ query: 'GERACAO recuperacao' }).map(c => c.id), ['rag']);
  assert.deepEqual(selectCards({ query: 'MEMORIA ancestrais' }).map(c => c.id), ['rag']);
  assert.equal(selectCards({ query: '   ' }).length, cards.length);
  assert.equal(selectCards({ query: '<script>alert(1)</script>' }).length, 0);
});
test('filtros combinam busca, tipo e grimório e suportam resultados vazios', () => {
  assert.deepEqual(selectCards({ query: 'busca', type: 'Feitiço', savedOnly: true, saved: ['hybrid', 'keyword'] }).map(c => c.id), ['hybrid']);
  assert.equal(selectCards({ savedOnly: true }).length, 0);
  assert.equal(selectCards({ type: 'Maldição' }).length, 2);
});

test('raças separam Matemática de Engenharia de IA e Todos reúne as áreas', () => {
  assert.deepEqual(selectCards({ race: 'Matemática' }).map(c => c.id), ['soma']);
  const engineering = selectCards({ race: 'Engenharia de IA' }).map(c => c.id);
  assert.ok(engineering.includes('hnsw') && engineering.includes('siege'));
  assert.ok(!engineering.includes('soma'));
  assert.equal(selectCards({ race: 'Todos' }).length, engineering.length + 1);
  assert.equal(selectCards({ race: 'Desconhecida' }).length, 0);
});

test('Soma combina raça, tema, busca, tipo e favoritos sem escapar dos filtros', () => {
  const selection = { query: 'MATEMATICA caixa ferramentas', race: 'Matemática', type: 'Artefato', savedOnly: true, saved: ['soma', 'keyword'] };
  assert.deepEqual(selectCards(selection).map(c => c.id), ['soma']);
  assert.deepEqual(selectCards({ ...selection, race: 'Engenharia de IA' }), []);
  assert.deepEqual(selectCards({ ...selection, type: 'Feitiço' }), []);
  assert.deepEqual(selectCards({ ...selection, saved: ['keyword'] }), []);
  assert.deepEqual(selectCards({ query: 'CAIXA DE FERRAMENTAS' }).map(c => c.id), ['soma']);
  assert.deepEqual(sanitizeSaved(['soma', 'soma', 'hnsw']), ['soma', 'hnsw']);
});
test('ordena sem modificar o catálogo e mantém desempate estável', () => {
  assert.equal(selectCards({ sort: 'cost' })[0].id, 'keyword');
  assert.equal(selectCards({ sort: 'rarity' })[0].rarity, 'Lendária');
  assert.equal(selectCards({ sort: 'name' })[0].id, 'hybrid');
  assert.equal(cards[0].id, 'rag');
});
test('persistência descarta dados incompatíveis, ids desconhecidos e duplicatas', () => {
  assert.deepEqual(sanitizeSaved({ rag: true }), []);
  assert.deepEqual(sanitizeSaved(null), []);
  assert.deepEqual(sanitizeSaved(['rag', 'rag', 'missing', 42, 'agent']), ['rag', 'agent']);
});

test('HNSW é encontrável pelo algoritmo e pela habilidade e pode ser salvo no grimório', () => {
  assert.deepEqual(selectCards({ query: 'hnsw' }).map(c => c.id), ['hnsw']);
  assert.deepEqual(selectCards({ query: 'SALTO HIERARQUICO' }).map(c => c.id), ['hnsw']);
  assert.deepEqual(selectCards({ query: 'hnsw', type: 'Invocação', savedOnly: true, saved: ['hnsw'] }).map(c => c.id), ['hnsw']);
  assert.deepEqual(sanitizeSaved(['hnsw', 'rag', 'hnsw']), ['hnsw', 'rag']);
  const hnsw = cards.find(c => c.id === 'hnsw');
  assert.ok(hnsw.combat.hp > 0 && hnsw.combat.attack > 0);
  assert.equal(hnsw.art, 'hnsw');
  assert.equal(hnsw.source, 'hnsw');
});

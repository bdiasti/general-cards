export const sources = {
  rag: { title: 'Lewis et al. — Retrieval-Augmented Generation (2020)', url: 'https://arxiv.org/abs/2005.11401' },
  search: { title: 'Elastic — Search approaches', url: 'https://www.elastic.co/docs/solutions/search/search-approaches' },
  hybrid: { title: 'Elastic — Hybrid search', url: 'https://www.elastic.co/docs/solutions/search/hybrid-search' },
  agents: { title: 'Anthropic — Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
  poison: { title: 'NIST — Adversarial Machine Learning (2025)', url: 'https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations-0' },
  contamination: { title: 'Xu et al. — Benchmark Data Contamination: A Survey (2024)', url: 'https://arxiv.org/abs/2406.04244' },
};

export const cards = [
  {
    id: 'rag', number: 1, name: 'Guardião dos Arquivos', concept: 'RAG', subtitle: 'Geração aumentada por recuperação', type: 'Invocação', rarity: 'Lendária', cost: 4, art: 'rag', color: 'gold', race: 'Engenharia de IA', lineage: 'Altos elfos · Ordem do Arquivo',
    ability: 'Memória dos ancestrais', summary: 'Recupere conhecimento dos arquivos antes de conjurar uma resposta.',
    flavor: '“Nem toda sabedoria precisa caber na memória de um mago.”',
    lore: 'Antes de aconselhar o conselho, o guardião consulta os pergaminhos da biblioteca élfica. Ele seleciona os trechos relevantes e os entrega ao oráculo, que compõe a resposta à luz dessas evidências.',
    explanation: 'RAG recupera documentos externos relevantes e os fornece como contexto para um modelo gerar uma resposta. O conhecimento consultado pode ser atualizado sem alterar os pesos do modelo.',
    example: 'Um assistente consulta trechos do manual de uma empresa antes de explicar sua política de férias, indicando de onde retirou a informação.',
    limit: 'O arquivo pode conter erros e o oráculo pode interpretar mal os trechos. RAG não garante respostas verdadeiras nem elimina alucinações; recuperar, gerar e verificar são etapas diferentes.',
    mechanic: 'Proposta: revele 3 cartas do seu grimório de duelo. Escolha 1 Feitiço, coloque-o na mão e devolva as demais ao fundo, em qualquer ordem.', related: ['lexical', 'semantic', 'hybrid'], source: 'rag',
    quiz: { question: 'O que RAG acrescenta à geração de uma resposta?', options: ['Contexto recuperado de fontes externas', 'Uma garantia de que toda resposta será verdadeira', 'Um novo treinamento completo a cada pergunta'], answer: 0, feedback: 'A recuperação traz contexto externo. Sua qualidade e a fidelidade da resposta ainda precisam ser verificadas.' },
  },
  {
    id: 'lexical', number: 2, name: 'Sentinela das Runas', concept: 'Busca lexical', subtitle: 'Relevância a partir dos termos', type: 'Invocação', rarity: 'Rara', cost: 2, art: 'lexical', color: 'green', race: 'Engenharia de IA', lineage: 'Anões · Guardiões das Runas',
    ability: 'Rastro das palavras', summary: 'Encontre os pergaminhos pelas palavras gravadas em suas runas.',
    flavor: '“Uma runa bem escolhida abre mil portas de pedra.”',
    lore: 'O sentinela percorre o índice das minas procurando as runas do pedido. Algumas inscrições pesam mais que outras: um símbolo raro pode ser mais revelador que dezenas de marcas comuns.',
    explanation: 'Busca lexical compara os termos da consulta aos termos indexados dos documentos. Analisadores podem normalizar palavras, e funções como BM25 podem ordenar resultados por relevância.',
    example: 'Procurar “erro 429” em uma base de suporte privilegia documentos que contêm esses termos específicos.',
    limit: 'Lexical não significa apenas igualdade literal: análise de texto pode alterar os termos. “Busca por palavra” pertence a essa família; não é uma técnica totalmente independente.',
    mechanic: 'Proposta: ao entrar em campo, examine as 2 primeiras cartas do grimório. Revele 1 que tenha a palavra “busca” no conceito e coloque-a na mão; devolva o restante ao fundo.', related: ['keyword', 'hybrid'], source: 'search',
    quiz: { question: 'A busca lexical se baseia principalmente em quê?', options: ['Proximidade visual das ilustrações', 'Termos presentes na consulta e no índice', 'Uma compreensão perfeita das intenções'], answer: 1, feedback: 'Ela trabalha com termos. Tokenização, normalização e ranking podem tornar esse processo mais sofisticado que uma comparação literal.' },
  },
  {
    id: 'semantic', number: 3, name: 'Tecelã de Significados', concept: 'Busca semântica', subtitle: 'Proximidade além das palavras', type: 'Feitiço', rarity: 'Épica', cost: 3, art: 'semantic', color: 'blue', race: 'Engenharia de IA', lineage: 'Elfos astrais · Círculo dos Ecos',
    ability: 'Ecos do sentido', summary: 'Siga o significado de uma pergunta, mesmo quando as palavras mudam.',
    flavor: '“Muitos nomes. Uma mesma constelação.”',
    lore: 'A tecelã conecta pedidos e pergaminhos por fios invisíveis. Quando alguém procura uma forma de atravessar as águas, ela encontra o tratado sobre pontes mesmo que o viajante nunca pronuncie essa palavra.',
    explanation: 'A busca semântica tenta recuperar conteúdo pelo significado. Uma implementação comum representa consultas e documentos como embeddings e compara sua proximidade vetorial.',
    example: 'A pergunta “como recuperar meu acesso?” pode encontrar um documento chamado “Redefinição de senha”.',
    limit: 'Proximidade vetorial não é prova de verdade, equivalência ou relevância. O modelo de embeddings e o domínio influenciam os resultados, especialmente com códigos e termos raros.',
    mechanic: 'Proposta: recupere do descarte 1 carta que compartilhe o tipo de outra carta em sua mão. Revele ambas para demonstrar a ligação.', related: ['lexical', 'hybrid', 'rag'], source: 'search',
    quiz: { question: 'Documentos próximos no espaço de embeddings são necessariamente verdadeiros?', options: ['Sim, a distância mede a verdade', 'Sim, desde que a consulta seja curta', 'Não, similaridade não garante verdade'], answer: 2, feedback: 'Embeddings representam padrões de significado. Proximidade não certifica a qualidade nem a veracidade do conteúdo.' },
  },
  {
    id: 'agent', number: 4, name: 'Estrategista do Conselho', concept: 'Ciclo de agente', subtitle: 'Planejar · validar · executar · observar', type: 'Invocação', rarity: 'Lendária', cost: 5, art: 'agent', color: 'gold', race: 'Engenharia de IA', lineage: 'Patrulheiros · Conselho das Rotas',
    ability: 'Conselho das três chamas', summary: 'Trace o plano, confira a ação e avance. Observe antes de recomeçar.',
    flavor: '“Nenhum mapa sobrevive sem ouvir os passos da jornada.”',
    lore: 'Como uma companhia de aventureiros, o estrategista define o próximo passo, verifica seus recursos e envia o patrulheiro. O relato que retorna pode mudar toda a rota. Um conselho prudente também sabe quando parar.',
    explanation: 'Um agente pode escolher ações e ferramentas para atingir uma meta, usar seus resultados como feedback e revisar o plano. Neste projeto, adotamos o ciclo planejar, validar a ação, executar e observar/avaliar o resultado.',
    example: 'Para investigar um erro, o agente planeja consultar logs, valida o acesso, executa a consulta e usa a evidência para decidir a próxima ação.',
    limit: 'Esse é um padrão possível, não uma sequência universal. Validar antes da execução não substitui verificar o resultado depois. Limites de passos, custo e permissões evitam ciclos sem controle.',
    mechanic: 'Proposta: uma vez no seu turno, examine a próxima carta, escolha mantê-la no topo ou movê-la ao fundo e então compre 1 carta. Registre a decisão antes da compra.', related: ['rag', 'poison'], source: 'agents',
    quiz: { question: 'Por que observar depois de executar?', options: ['Porque a execução pode produzir um resultado diferente do esperado', 'Porque o plano inicial nunca pode mudar', 'Porque observar elimina a necessidade de limites'], answer: 0, feedback: 'O feedback do ambiente orienta a próxima decisão. A validação prévia e a avaliação posterior têm funções diferentes.' },
  },
  {
    id: 'keyword', number: 5, name: 'Chave da Palavra Exata', concept: 'Busca por palavra', subtitle: 'Uma especialização da busca lexical', type: 'Artefato', rarity: 'Comum', cost: 1, art: 'lexical', color: 'green', race: 'Engenharia de IA', lineage: 'Anões · Forja dos Índices',
    ability: 'Selo do nome', summary: 'Algumas portas só se abrem quando a palavra certa é encontrada.',
    flavor: '“Conhecer o nome é encontrar a passagem.”',
    lore: 'Na porta das minas, a chave não adivinha intenções: procura a inscrição escolhida. O guardião precisa saber se o selo exige o nome inteiro ou aceita suas formas normalizadas.',
    explanation: '“Busca por palavra” é um nome amplo para localizar termos. Nesta carta, representa o caso simples de correspondência de um termo, dentro da família lexical; não pressupõe busca semântica.',
    example: 'Localizar o identificador “ERR_AUTH_17” em logs. Um campo configurado para correspondência exata pode preservar o identificador inteiro.',
    limit: 'A correspondência depende da configuração: maiúsculas, acentos e divisão em tokens podem ser tratados de formas diferentes. Palavra, frase e substring não são necessariamente a mesma consulta.',
    mechanic: 'Proposta: equipe em Sentinela das Runas. Ao usar sua habilidade, examine 1 carta adicional. Limite de 1 Chave por Sentinela.', related: ['lexical'], source: 'search',
    quiz: { question: 'Qual é a relação entre busca por palavra e busca lexical nesta coleção?', options: ['São opostos', 'Busca por palavra é um caso da família lexical', 'Toda busca por palavra usa embeddings'], answer: 1, feedback: 'A carta separa o caso simples para ensinar o conceito gradualmente, sem inventar uma categoria técnica independente.' },
  },
  {
    id: 'hybrid', number: 6, name: 'Aliança dos Dois Saberes', concept: 'Busca híbrida', subtitle: 'Termos e significado em conjunto', type: 'Feitiço', rarity: 'Épica', cost: 4, art: 'semantic', color: 'blue', race: 'Engenharia de IA', lineage: 'Aliança · Runas e Constelações',
    ability: 'Convergência dos caminhos', summary: 'Una a precisão das runas aos ecos do significado.',
    flavor: '“Onde um caminho termina, o outro encontra uma pista.”',
    lore: 'O sentinela e a tecelã apresentam suas listas ao conselho. Um mediador combina as posições dos pergaminhos para produzir uma única seleção, preservando tanto os nomes raros quanto as relações de sentido.',
    explanation: 'Busca híbrida combina resultados de métodos de recuperação diferentes, como busca lexical e vetorial. Uma técnica de fusão é RRF, que usa as posições nos rankings para compor uma nova ordenação.',
    example: 'Procurar “falha de autenticação ERR_AUTH_17” usa o identificador exato e o significado do problema para recuperar documentos úteis.',
    limit: 'Juntar métodos não garante melhoria em toda consulta. A fusão e seus parâmetros precisam ser avaliados em exemplos representativos; notas de sistemas diferentes não são diretamente comparáveis.',
    mechanic: 'Proposta: se Sentinela das Runas estiver em campo e Busca semântica estiver no descarte, recupere Busca semântica e compre 1 carta.', related: ['lexical', 'semantic', 'rag'], source: 'hybrid',
    quiz: { question: 'O que a fusão RRF utiliza?', options: ['A cor dos documentos', 'Apenas o tamanho do texto', 'As posições dos documentos nos rankings'], answer: 2, feedback: 'RRF combina posições. Isso evita tratar escores brutos de métodos diferentes como se fossem a mesma escala.' },
  },
  {
    id: 'poison', number: 7, name: 'Sussurro do Palantír', concept: 'Envenenamento de dados', subtitle: 'Data poisoning', type: 'Maldição', rarity: 'Épica', cost: 3, art: 'poison', color: 'purple', race: 'Engenharia de IA', lineage: 'Sombras · A Torre Corrompida',
    ability: 'Sabedoria corrompida', summary: 'Quando a fonte é manipulada, até um sábio pode aprender o engano.',
    flavor: '“A mentira mais perigosa veste as cores de uma verdade antiga.”',
    lore: 'Imagine a influência de Sauron sobre Saruman pelo palantír como uma metáfora: o sábio confia em uma fonte controlada pelo adversário. Em nossa fábula, as mensagens também adulteram os pergaminhos usados para instruir seus aprendizes.',
    explanation: 'Envenenamento de dados é a manipulação intencional de dados de treinamento para influenciar o comportamento de um modelo, por exemplo induzindo erros ou respostas direcionadas.',
    example: 'Um adversário insere exemplos com rótulos alterados no conjunto de treino para que um classificador aprenda associações prejudiciais.',
    limit: 'Não é um envenenamento literal de Saruman nem uma descrição canônica da trama. Manipular uma fonte consultada em tempo de execução é uma ameaça relacionada, mas não é automaticamente envenenamento do treinamento.',
    mechanic: 'Proposta: uma Invocação adversária perde sua habilidade até o início do seu próximo turno. Efeito ilustrativo; não representa uma defesa técnica real.', related: ['contamination', 'rag'], source: 'poison',
    quiz: { question: 'O que caracteriza o envenenamento de dados descrito aqui?', options: ['Qualquer erro acidental de digitação', 'Manipulação intencional de dados usados no treinamento', 'Apenas consultar um documento desatualizado'], answer: 1, feedback: 'O elemento adversarial e a influência sobre o treinamento distinguem esse ataque de outras falhas de dados.' },
  },
  {
    id: 'contamination', number: 8, name: 'Espelho das Respostas', concept: 'Contaminação de dados', subtitle: 'Vazamento entre treino e avaliação', type: 'Maldição', rarity: 'Rara', cost: 2, art: 'contamination', color: 'blue', race: 'Engenharia de IA', lineage: 'Oráculos · Salão dos Reflexos',
    ability: 'Falsa clarividência', summary: 'Ver a prova antes do desafio faz memorização parecer sabedoria.',
    flavor: '“O espelho sabia as respostas. O aprendiz, talvez não.”',
    lore: 'Um aprendiz estuda em um espelho encantado sem perceber que ele reflete as perguntas do exame final. Ao acertar todas, parece um grande oráculo; ninguém demonstrou que conseguiria enfrentar enigmas novos.',
    explanation: 'Na avaliação de modelos, contaminação pode ocorrer quando exemplos ou informações do conjunto de teste aparecem nos dados de treinamento. As métricas podem então superestimar a capacidade de generalizar.',
    example: 'Um modelo é avaliado com perguntas de um benchmark que já estavam no corpus de treino, incluindo suas respostas.',
    limit: 'Aqui “contaminação” significa vazamento de avaliação, não qualquer problema de qualidade. Pode ser acidental e não implica ataque. Acerto alto sozinho não comprova vazamento; é necessário investigar a sobreposição.',
    mechanic: 'Proposta: um adversário revela 1 carta da mão à sua escolha. Informação antecipada cria vantagem no jogo, mas não comprova aprendizado no mundo real.', related: ['poison'], source: 'contamination',
    quiz: { question: 'Por que respostas do teste no treino são um problema?', options: ['Podem fazer a avaliação superestimar a generalização', 'Sempre tornam o modelo mais lento', 'Provam que houve um ataque deliberado'], answer: 0, feedback: 'A avaliação deixa de separar bem o que foi aprendido de forma generalizável do que já foi visto. O vazamento pode ser acidental.' },
  },
];

export function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
export function selectCards({ query = '', type = 'Todos', sort = 'number', savedOnly = false, saved = [] } = {}) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const rarity = { Comum: 1, Rara: 2, Épica: 3, Lendária: 4 };
  return cards.filter(c => (type === 'Todos' || c.type === type) && (!savedOnly || saved.includes(c.id)) && terms.every(t => normalize([c.name, c.concept, c.subtitle, c.summary, c.lineage, c.race, c.ability].join(' ')).includes(t)))
    .sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name, 'pt-BR') : sort === 'cost' ? a.cost - b.cost : sort === 'rarity' ? rarity[b.rarity] - rarity[a.rarity] : a.number - b.number);
}

export function sanitizeSaved(value) { return Array.isArray(value) ? [...new Set(value)].filter(id => cards.some(c => c.id === id)) : []; }

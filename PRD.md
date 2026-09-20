# Arcana — Crônicas do Conhecimento

**PRD v0.2 · 20 de setembro de 2026 · Status: coleção + arena jogável**

## Entrega v0.2 — Arena dos Saberes

Além da coleção, o produto oferece duelos de três cartas contra três, contra o computador ou entre duas pessoas no mesmo aparelho. Todas as oito cartas possuem HP, ataque básico, função e um poder exclusivo. Todos os tipos se manifestam como combatentes neste modo; raridade e favoritos não concedem vantagens.

Cada equipe escolhe três cartas diferentes e recebe três pontos de mana por rodada. Os jogadores alternam uma ação por vez: ataque básico gratuito, defesa gratuita com três pontos de escudo, ou poder com custo de um ou dois pontos de mana. Cada carta viva age uma vez na rodada. Ao usar um poder, ele fica indisponível na rodada seguinte. A iniciativa inicial é sorteada e alterna nas rodadas seguintes.

Poderes incluem cura limitada ao HP máximo, dano que ignora escudos, escudo próprio, marca de dano adicional, golpe de baixo custo, ataque com cura, veneno por duas rodadas e redução temporária de dano. Escudos, marcas e fraqueza expiram ao iniciar outra rodada; veneno não acumula. Cartas derrotadas não podem agir nem ser curadas. Vence quem derrota a equipe rival; eliminações simultâneas empatam.

A partir da rodada nove, uma tempestade causa dano crescente em todas as cartas vivas, ignorando escudos. O último duelo fica salvo no navegador por replay validado. Há retomada, registro de ações, explicação das regras e revanche com iniciativa invertida. Online, contas, ranking e progressão competitiva continuam fora desta entrega.

Equilíbrio é avaliado por simulações pareadas entre todas as 56 formações possíveis, com os dois lados usando o mesmo bot e alternando quem começa. Essa avaliação detecta disparidades e não substitui partidas humanas, outras estratégias ou medição de diversão.

**Histórico:** as seções 1–12 abaixo registram o planejamento e a entrega da v0.1. Menções a duelos futuros e mana experimental nessas seções foram superadas pelas regras acima.

Nome de trabalho, terminologia de raças e proposta de combate permanecem abertos à evolução com o criador. Este documento distingue requisitos solicitados, decisões do protótipo e hipóteses para validação.

## 1. Visão do produto

Criar um card game educativo com o prazer de descobrir, colecionar e combinar cartas de um TCG, inspirado em Pokémon TCG e na fantasia de Dungeons & Dragons e O Senhor dos Anéis. Cada raça representa uma área de conhecimento do mundo real. Suas cartas personificam conceitos, ferramentas, processos, boas práticas e ameaças dessa área.

**Promessa:** transformar um conceito abstrato em uma história memorável, sem perder a precisão técnica.

A primeira raça é **Engenharia de IA**, apresentada como o reino **Os Arquitetos do Invisível**. RAG ganha a forma de um guardião que consulta arquivos élficos; a busca lexical, de um sentinela anão que lê runas; o ciclo de agente, de um estrategista que planeja a jornada e aprende com seus resultados.

O site começa como uma coleção interativa com conteúdo educacional. A experiência de duelo é uma evolução do mesmo produto, com regras próprias a serem testadas.

## 2. Necessidade e público

### Problema

Conceitos técnicos frequentemente chegam como listas de termos desconectados. Definições curtas podem ser difíceis de lembrar, enquanto analogias livres demais ensinam relações falsas. Materiais tradicionais também oferecem pouca motivação para explorar conceitos relacionados.

### Público inicial

- Pessoas iniciantes ou intermediárias em IA e engenharia de software que gostam de fantasia e jogos de cartas.
- Profissionais que desejam revisar conceitos e construir um repertório de explicações.
- Educadores e comunidades que desejam usar cartas para iniciar conversas e desafios de aprendizagem.

Português brasileiro é o idioma inicial. O produto não exige familiaridade prévia com regras de RPG ou TCG. A narrativa deve funcionar mesmo para quem não conhece as referências de fantasia.

### Jornada desejada

Descobrir uma carta pela arte → reconhecer seu conceito → ler a analogia → compreender a explicação real → reconhecer o limite da analogia → responder a um desafio → salvar a carta → explorar suas conexões → futuramente combinar cartas em um duelo.

## 3. Requisitos iniciais e decisões de escopo

| Origem | Requisito/decisão | Tratamento na v0.1 |
|---|---|---|
| Solicitado | Card game inspirado no apelo de Pokémon TCG | Coleção, tipos, mana, raridade e proposta de habilidades |
| Solicitado | Universo de D&D e Senhor dos Anéis | Alta fantasia, elfos, anões, magos, companhias, palantír e referências narrativas |
| Solicitado | Raças vinculadas a áreas reais | Uma raça/domínio: Engenharia de IA |
| Solicitado | Conceitos como RAG, busca lexical, palavras e ciclo de agente | Cartas iniciais com explicações e analogias |
| Solicitado | Criatividade com validade conceitual | Fonte, exemplo e limite da analogia por carta |
| Solicitado | Site para exibir cartas bonitas | Galeria responsiva e painel de leitura |
| Solicitado | Artes das cartas | Seis ilustrações generativas originais para oito cartas |
| Delegado | Escolha da tecnologia | DOM, HTML, CSS e módulos JavaScript; servidor local Node.js |
| Proposto | Grimório pessoal e pequenos desafios | Implementados, sem conta |
| Proposto | Duelos, progressão e novas raças | Roadmap; não implementados neste marco |

### Entregue neste marco

- PRD, guia de execução e documentação editorial.
- Oito cartas com arte, história, descrição, exemplo, ressalva conceitual, fonte, conexão com outras cartas e desafio.
- Galeria com busca por nome, conceito, habilidade, linhagem ou raça; busca insensível a acentos e caixa.
- Filtro por tipo, ordenação por número, nome, mana ou raridade e contador de resultados.
- Painel de carta com abas de lenda, conceito real e desafio de múltipla escolha.
- Salvar/remover cartas no grimório local e persistir a seleção entre visitas no mesmo navegador.
- Links diretos para cartas, cópia de link, estados vazios, guia inicial e apresentação dos reinos.

### Fora do marco atual

Duelos executáveis, matchmaking, multiplayer, login, sincronização entre dispositivos, pagamentos, boosters pagos, mercado de cartas, chat, editor administrativo, geração de cartas em tempo real, certificação de domínio e métricas remotas. Nenhuma interface pode apresentar essas capacidades como já disponíveis.

## 4. Universo e taxonomia

**Arcana** é uma biblioteca viva de reinos do conhecimento. Cada domínio reúne maneiras diferentes de estudar o mundo. As linhagens oferecem uma linguagem visual e narrativa, sem substituir a classificação técnica.

| Termo | Significado |
|---|---|
| Raça/domínio | Área do conhecimento: Engenharia de IA, por exemplo |
| Reino | Apresentação narrativa do domínio: Arquitetos do Invisível |
| Linhagem | Arquétipo de fantasia dentro do domínio: elfos arquivistas, anões das runas |
| Carta | Um conceito ou recorte didático com identidade própria |
| Tipo | Papel sugerido no jogo: Invocação, Feitiço, Artefato, Maldição |
| Raridade | Categoria de apresentação/coleção; não mede relevância ou verdade |
| Mana | Custo proposto para jogar uma carta no futuro duelo |
| Grimório pessoal | Favoritos do catálogo, sem limite no protótipo |
| Grimório de duelo | Futuro baralho com restrições; distinto dos favoritos |
| Coleção | Conjunto editorial de cartas publicadas em uma edição |

Manter a intenção de “raça = área” é um requisito. A interface usa também “reino” para apresentar a área com mais clareza, enquanto elfo e anão são linhagens estéticas. A nomenclatura final pode ser refinada com o criador.

### Raça inicial

**Engenharia de IA — Os Arquitetos do Invisível**

Especialidade: informação, recuperação, raciocínio orientado a ações e confiabilidade. Identidade visual: verde floresta, pergaminho e ouro; detalhes frios para significado e violeta para corrupção. Sinergia sugerida: recuperar informação, conectá-la e agir a partir de evidências.

### Expansões propostas

Forjadores de Sistemas (engenharia de software), Guardiões dos Selos (segurança da informação) e Cartógrafos do Acaso (estatística e ciência de dados). Esses nomes são propostas, sem cartas ou promessa de data.

## 5. Contrato editorial e de aprendizagem

### Anatomia de uma carta

1. Identidade estável: ID, número na edição, nome de fantasia e conceito real.
2. Raça, linhagem, tipo, raridade e mana proposta.
3. Ilustração, texto alternativo, origem da arte e prompt rastreável.
4. Resumo curto para leitura no catálogo.
5. Frase de ambientação e narrativa da analogia.
6. Explicação técnica em linguagem simples.
7. Exemplo aplicável no mundo real.
8. Limite explícito: o que a história não implica.
9. Fonte técnica primária e versão do conteúdo.
10. Relações com outras cartas, habilidade experimental e desafio com feedback.

### Critério de qualidade

Uma carta só pode ser considerada pronta editorialmente quando a pessoa consegue separar **o que é ficção**, **o que é conceito técnico** e **o que é regra de jogo**. Uma analogia bonita não compensa uma explicação incorreta. Mecânicas ilustrativas não devem ser apresentadas como demonstrações científicas.

Fontes devem priorizar artigos originais, documentação oficial e publicações técnicas institucionais. Revisões relevantes exigem atualizar o conteúdo, a versão e a data de verificação. O conteúdo v0.1 foi escrito com consulta a fontes; a revisão independente por especialista permanece uma etapa para lançamento público.

### Decisões conceituais já adotadas

- **Busca lexical e busca por palavra:** a segunda é tratada como caso didático da primeira. Não inventar duas técnicas sem relação.
- **RAG:** recupera contexto para a geração; não garante verdade nem significa retreinar o modelo a cada consulta.
- **Busca semântica:** proximidade de representações não comprova verdade ou equivalência.
- **Busca híbrida:** combinar rankings não garante melhoria universal. Avaliar no domínio real.
- **Ciclo de agente:** planejar → validar a ação → executar → observar/avaliar → decidir continuar, revisar ou parar. A ordem representa uma escolha deste projeto, não um padrão universal obrigatório.
- **Envenenamento de dados:** manipulação adversarial dos dados de treinamento.
- **Contaminação de avaliação:** informações do teste presentes no treinamento; pode ser acidental e inflar métricas.
- **Saruman/Sauron:** a influência pelo palantír é usada como metáfora de uma fonte comprometida. “Saruman foi envenenado” não deve ser ensinado como envenenamento literal nem como descrição exata de data poisoning. O texto explica a adaptação ficcional.

### Processo para criar novas cartas

Escolher objetivo de aprendizagem → delimitar conceito e pré-requisitos → consultar fonte → redigir explicação e exemplo → criar analogia → explicitar seus limites → propor habilidade → gerar arte → revisar tecnicamente e visualmente → testar no site → adicionar relações e desafio → publicar nova versão editorial.

Checklist: a fonte sustenta a definição? Há promessa excessiva? A analogia confunde treino com inferência? As perguntas testam entendimento? Os distratores têm uma única resposta correta? O nome cabe na carta? A imagem funciona também em tamanho pequeno?

## 6. Primeira coleção

**Capítulo I — O Despertar · Edição alfa · 8 cartas**

| Nº | Carta | Conceito | Tipo | Mana | Raridade |
|---|---|---|---|---:|---|
| 001 | Guardião dos Arquivos | RAG | Invocação | 4 | Lendária |
| 002 | Sentinela das Runas | Busca lexical | Invocação | 2 | Rara |
| 003 | Tecelã de Significados | Busca semântica | Feitiço | 3 | Épica |
| 004 | Estrategista do Conselho | Ciclo de agente | Invocação | 5 | Lendária |
| 005 | Chave da Palavra Exata | Busca por palavra | Artefato | 1 | Comum |
| 006 | Aliança dos Dois Saberes | Busca híbrida | Feitiço | 4 | Épica |
| 007 | Sussurro do Palantír | Envenenamento de dados | Maldição | 3 | Épica |
| 008 | Espelho das Respostas | Contaminação de dados | Maldição | 2 | Rara |

O catálogo integral, incluindo textos, fontes e perguntas, reside em `src/cards.js`. A v0.1 reaproveita a arte lexical na carta 005 e a arte semântica na 006, como variações da mesma família de conceitos. Artes exclusivas para essas duas cartas fazem parte do próximo polimento.

## 7. Requisitos funcionais e critérios de aceitação

| ID | Requisito | Aceitação |
|---|---|---|
| RF01 | Explorar coleção | Renderizar as oito cartas com nome, conceito, tipo, mana, arte e raridade |
| RF02 | Buscar | “geracao recuperacao” encontra RAG; caixa e acentos não alteram a correspondência; múltiplos termos devem estar presentes |
| RF03 | Filtrar | Tipo e busca se combinam; Maldições retorna duas cartas sem consulta adicional |
| RF04 | Ordenar | Nome usa ordenação pt-BR; mana crescente; raridade decrescente; ordem original recuperável |
| RF05 | Ler carta | Um painel acessível exibe lenda, conceito, exemplo, limite, fonte, habilidade e relações |
| RF06 | Testar saber | Exibir uma pergunta, três opções, uma resposta correta e feedback; permitir nova tentativa |
| RF07 | Guardar carta | Adicionar/remover atualiza contador e coleção; atualizar a página preserva o grimório |
| RF08 | Recuperar estado inválido | Dados locais desconhecidos ou inválidos não impedem abrir a coleção; IDs inválidos são ignorados |
| RF09 | Tratar indisponibilidade | Se o armazenamento falhar, manter a seleção em memória e informar que vale só na sessão |
| RF10 | Compartilhar | URL `/#carta/rag` abre a carta; copiar link confirma resultado ou orienta copiar a URL |
| RF11 | Navegar relações | Um conceito relacionado abre sua carta mantendo o painel funcional |
| RF12 | Explicar estado vazio | Busca sem resultado ou grimório vazio oferecem uma ação para retornar à coleção |
| RF13 | Conhecer projeto | Guia e reinos esclarecem estado alfa e expansões sem simular funcionalidades inexistentes |

Uma única raça está disponível. “Todos os reinos” e “Engenharia de IA” mostram a mesma coleção neste marco. Quando surgir a segunda raça, adicionar filtro real pelo campo `race`, testar combinações e remover contagens fixas.

## 8. Proposta de jogo para validar

**Hipótese de design v0.1, ainda não implementada nem balanceada.** O objetivo é preservar a descoberta e combinação de um TCG enquanto aprender ajuda a compreender as relações entre cartas.

- Partida para 2 jogadores, duração alvo de 10–15 minutos.
- Baralho inicial proposto de 24 cartas, até 3 cópias de uma mesma carta e até 1 de cada lendária. O catálogo atual ainda não constitui dois decks balanceados.
- Cada jogador começa com 20 pontos de integridade e compra 5 cartas.
- Mana: 1 no primeiro turno, aumentando em 1 por turno até 8; recarrega no início do turno.
- Turno: preparar → comprar → jogar cartas/pagar mana → resolver habilidades → enfrentar → encerrar.
- Invocações permanecem em campo; Feitiços e Maldições são resolvidos e descartados; Artefatos ficam equipados conforme suas restrições.
- Vitória proposta: reduzir a integridade adversária a zero. Empate, limite de turnos e condição de compra com baralho vazio precisam de especificação antes do motor.
- Atributos de ataque, defesa, limite de campo, iniciativa, prioridade e desempates serão definidos com um protótipo de mesa, antes da implementação digital.
- Desafios de aprendizagem funcionam de forma independente no catálogo. Qualquer recompensa competitiva por resposta será testada para não favorecer somente conhecimento prévio ou memorização do quiz.

As habilidades já escritas comunicam uma direção: RAG recupera opções; lexical encontra termos; semântica relaciona; híbrida cria sinergia; agente observa e decide; ameaças prejudicam confiança ou revelam informação. Custos e raridades podem mudar.

**Saída necessária do próximo marco de regras:** documento sem ambiguidades sobre zonas, fases, custos, alvos, temporização, resolução de efeitos, condições de vitória, decks iniciais e 20 cenários de exemplo. Só então iniciar o motor de duelo.

## 9. Experiência, visual e acessibilidade

Direção: livro de alta fantasia encontrado em uma biblioteca ancestral. Verde profundo e ouro envelhecido no site, pergaminho legível nas cartas, pinturas dramáticas e detalhes discretos de runas. Interface editorial com espaço em branco, sem excesso de brilhos ou animações contínuas.

Hierarquia: arte atrai → nome cria identidade → conceito real ancora o aprendizado → painel aprofunda. Texto real permanece em HTML, separado da imagem, para busca, seleção, acessibilidade, revisão e futuros idiomas.

Layout: quatro colunas no desktop, três no tablet e duas no celular; detalhes em painel com rolagem. O painel oferece leitura maior do conteúdo exibido em miniatura. Fontes serifadas para ambientação e sem serifa para controles.

Requisitos: teclado completo, foco visível, controles rotulados, Escape fecha o painel, foco restaurado, abas com teclas de seta, texto alternativo, erros descritos por texto e respeito a `prefers-reduced-motion`. Contraste deve ser medido antes de declarar conformidade WCAG. Não depende de hover para acesso às ações em telas touch.

Metas de produção: WCAG 2.2 AA, áreas de toque de 44 px, nenhuma rolagem horizontal a partir de 360 px, funcionamento a 200% de zoom e experiência válida sem carregamento das fontes externas. As miniaturas usam texto reduzido; o painel de leitura é o caminho para consumo detalhado e deve ser refinado em testes com usuários.

## 10. Arquitetura e decisão de tecnologia

### Decisão do marco inicial

**HTML semântico + CSS + JavaScript ES Modules + Node.js 22+.** Sem dependências de instalação e sem serviço remoto necessário para conteúdo, favoritos ou desafios. As fontes web são opcionais e têm fallback local. O servidor entregue é apenas para desenvolvimento local e usa endereço de loopback.

O problema inicial é apresentar e explorar cartas com legibilidade e facilidade de edição. Não exige física, cena 3D ou um motor de jogo. O DOM permite implementar e testar rapidamente o produto editorial, com conteúdo acessível.

| Opção | Papel e decisão |
|---|---|
| HTML/CSS/JS | Escolha atual para galeria e aprendizagem; funciona como site estático |
| React + TypeScript | Candidato quando o estado de editor, decks e combate justificar componentes e contratos mais rígidos; migração não é requisito atual |
| Three.js | Reavaliar para mesa 3D/efeitos opcionais quando houver benefício comprovado; manter interface e conteúdo no DOM |
| Godot | Reavaliar se o produto evoluir para jogo nativo ou apresentação 2D complexa; não necessário para este catálogo web |

Essa decisão é de escopo e simplicidade, não uma limitação permanente. Um futuro motor de regras deve ser isolado da interface, determinístico e testável; multiplayer exigirá servidor autoritativo.

### Estrutura atual

```text
index.html             estrutura do site
src/cards.js           catálogo, fontes, busca e saneamento de favoritos
src/app.js             navegação, painel, desafios e persistência
src/style.css          sistema visual e responsividade
public/art/*.png       seis artes originais
docs/art-prompts.json  prompts, método e registro de geração
server.mjs             servidor local com caminhos públicos limitados
tests/cards.test.js    validações de conteúdo, busca, filtros e estado salvo
design-system/         decisões e referência visual
PRD.md                 produto e roadmap
```

### Dados e persistência

IDs de cartas são estáveis. Relações armazenam IDs, não cópias de textos. A chave `arcana.grimoire.v1` contém apenas uma lista deduplicada de IDs; validação ignora valores desconhecidos. Não há conta, dados pessoais nem sincronização remota. Limpar os dados do navegador apaga os favoritos. O estado de respostas aos desafios é temporário e não representa progresso certificado.

### Requisitos não funcionais

- Toda mudança de carta preserva seu ID ou define migração explícita.
- Conteúdo local determinístico; não fazer chamadas de IA durante a navegação.
- Imagens reservam espaço; carregamento tardio no catálogo; ausência de dependências de runtime externas além de fontes opcionais.
- Antes de produção, derivar WebP/AVIF e thumbnails dos originais, hospedar fontes localmente e verificar o peso inicial. O alfa mantém PNGs originais (~17 MB somados), portanto **não atende ainda ao orçamento de performance de produção**.
- Metas de produção: LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms no percentil 75. Não são métricas medidas do protótipo.
- Futuro conteúdo administrativo precisa de validação de esquema, sanitização e revisão antes de publicação. O catálogo atual é estático e controlado no código.

## 11. Métricas, validação e roadmap

### Hipóteses a validar

1. A pessoa identifica o conceito de uma carta e explica sua analogia depois de uma leitura.
2. A narrativa aumenta a vontade de explorar, sem gerar crenças técnicas incorretas.
3. O formato visual é colecionável e mantém boa leitura no celular.
4. A relação entre conceitos sustenta combinações interessantes em um futuro duelo.

Teste formativo proposto com 5–8 pessoas: pedir para encontrar uma carta, explicar um conceito, identificar o limite da analogia, responder a uma situação nova e salvar o favorito. Reavaliar retenção após uma semana. A amostra serve para descobrir problemas, não para provar eficácia educacional.

Metas exploratórias: ≥ 80% completam encontrar/abrir/salvar sem ajuda; ≥ 70% explicam corretamente dois dos três conceitos estudados; nenhum erro grave de interpretação permanece sem revisão editorial. Instrumentação futura poderá medir abertura, leitura e acertos, com consentimento e definição de privacidade antes de coleta. **Nenhum resultado ou usuário é simulado no site.**

### Roadmap por marcos, sem compromisso de prazo

| Marco | Resultado | Critério para avançar |
|---|---|---|
| M0 — Fundação | Este PRD + galeria + 8 cartas | Fluxos essenciais verificados e direção revisável |
| M1 — Qualidade editorial | Revisão especialista, arte exclusiva por carta, fontes locais, imagens otimizadas, revisão mobile/a11y | Sem ambiguidades conceituais graves e orçamento de assets validado |
| M2 — Regras de mesa | Regras fechadas e dois decks de teste | Partidas completas sem decisões improvisadas; registrar tempo e desequilíbrios |
| M3 — Duelo local | Motor determinístico e partida no mesmo dispositivo | Vitória, custo, alvos e efeitos cobertos por testes |
| M4 — Autoria e expansão | Editor, novas raças, revisão e versionamento | Publicar uma carta sem alterar a interface |
| M5 — Contas e multiplayer | Perfis, sincronização e servidor autoritativo | Estado consistente, reconexão e proteção contra ações inválidas |

### Backlog imediato

| Prioridade | Item | Aceitação |
|---|---|---|
| P0 | Revisar a primeira coleção com o criador | Nomes, tom, raças e analogias validados ou revisados |
| P0 | Revisão técnica independente | Todas as definições e limites aprovados por responsável editorial |
| P1 | Duas artes adicionais | Cartas 005 e 006 com cenas exclusivas mantendo a identidade visual |
| P1 | Performance dos assets | Variantes responsivas e orçamento medido no celular |
| P1 | Auditoria de acessibilidade | Zoom, foco, leitor de tela, contrastes e alvos medidos |
| P1 | Regras v0.2 | Resolver as questões de combate e testar dois decks |
| P2 | Novas cartas de IA | Embeddings, chunking, reranking, alucinação, avaliação e prompt injection, com distinções explícitas |
| P2 | Segunda raça | Escolher domínio e produzir uma coleção pequena coerente |

## 12. Riscos e decisões em aberto

| Risco | Tratamento |
|---|---|
| Confundir fantasia com mecanismo técnico | Separar narrativa, conceito, exemplo e limites em todas as cartas |
| Confundir conceito relacionado com sinônimo | Explicar lexical/palavra e poisoning/contaminação separadamente |
| Aprender apenas a resposta do quiz | Usar situações novas em avaliação de aprendizagem e ampliar banco de questões |
| Regras bonitas mas sem equilíbrio | Validar em mesa antes de automatizar duelos |
| Arte pesada e texto pequeno no celular | Otimizar assets e oferecer painel de leitura; medir em dispositivos reais |
| Favoritos locais serem percebidos como conta | Informar que a coleção pessoal fica neste navegador |
| Dependência excessiva das franquias de inspiração | Personagens e ilustrações originais; registrar referências explícitas como referências. A estratégia de marca/licenciamento para publicação comercial permanece uma decisão de produto futura |
| Conteúdo técnico envelhecer | Registrar fonte, versão e data, com revisões editoriais |

Questões para as próximas conversas: manter Arcana como nome? Usar “raças”, “ordens” ou “reinos” como rótulo principal? Preferir referências explícitas a personagens conhecidos ou um universo próprio com analogias pontuais? Qual domínio vem depois de IA? O primeiro duelo será competitivo, cooperativo ou uma aventura solo? Qual será o papel do conhecimento nas regras sem tornar cada turno uma prova?

Essas questões não bloqueiam a exploração e evolução do catálogo atual.

### Fontes técnicas da coleção

- [Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401).
- [Elastic — Search approaches](https://www.elastic.co/docs/solutions/search/search-approaches).
- [Elastic — Hybrid search](https://www.elastic.co/docs/solutions/search/hybrid-search).
- [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).
- [NIST — Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (2025)](https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations-0).
- [Xu et al. — Benchmark Data Contamination of Large Language Models: A Survey](https://arxiv.org/abs/2406.04244).

Fontes consultadas em 20/09/2026. Mecânicas de jogo e narrativas são propostas criativas do projeto, não afirmações dessas fontes.

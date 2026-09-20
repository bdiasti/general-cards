# Arcana — Crônicas do Conhecimento

Coleção educativa e arena de duelos de alta fantasia. Onze cartas de Engenharia de IA e Matemática com HP, ataque, poderes próprios, nove ilustrações geradas para o projeto, conceitos fundamentados e desafios.

## Executar

Requer Node.js 22 ou superior. Não é necessário instalar pacotes.

```sh
npm run dev
```

Abra http://localhost:4173. Use `PORT` para selecionar outra porta. O servidor escuta apenas em loopback e é destinado a desenvolvimento local. Para hospedar estaticamente, publique `index.html`, `src/`, `public/` e `PRD.md` na raiz do site.

## Hospedagem

Execute `npm run build` para gerar o site estático em `dist/`. A configuração de hospedagem está em `.openai/hosting.json`.

## Verificar

```sh
npm run check
npm test
```

O runner de testes usa isolamento desabilitado para funcionar em ambientes Windows que não permitem subprocessos. Os testes usam somente módulos nativos de Node.js.

## O que funciona

Galeria responsiva, busca sem acentos, filtros por tipo, quatro ordenações, detalhes com fontes, desafios com feedback, cartas relacionadas, links diretos e favoritos locais. Experimente `/#carta/rag`. `/` foca a busca. Escape fecha o painel. As setas navegam as abas.

Na [Arena dos Saberes](https://arcana-conhecimento.contaaxie1990.chatgpt.site/#arena), escolha 3 cartas e jogue contra o computador ou outro jogador no mesmo aparelho. Ataque, defenda e combine poderes com 3 de mana por rodada. Há cura, escudos, veneno, marca e fraqueza, iniciativa alternada, tempestade contra partidas infinitas e revanche. Todas as cartas são livres para jogar; raridade não concede bônus.

O grimório e o último duelo ficam no `localStorage` deste navegador; não há conta ou sincronização. A partida salva é reconstruída a partir de ações validadas pelo motor. Os desafios educativos não persistem pontuação. Multiplayer online não está incluído nesta edição.

A carta 009, **Cartógrafa dos Mil Caminhos**, apresenta HNSW com ilustração própria, explicação, fonte primária, quiz e poder de salto entre adversários. Acesso direto: `/#carta/hnsw`. Prompt da arte: [docs/hnsw-art-prompt.json](docs/hnsw-art-prompt.json).

A carta 010, **O Cerco Sem Fim**, representa prompt injection e guardrails como uma disputa eterna de gato e rato. Poder Brecha e Barreira: 3 de dano ignorando escudo e 2 de escudo próprio. Atributos iniciais, sem nova simulação de equilíbrio. Acesso: `/#carta/siege`.

A raça **Matemática** estreia com a temática **Caixa de Ferramentas** e a carta 011, **Soma, a Primeira Ferramenta**. Adição é apresentada como uma ferramenta básica reutilizável para juntar quantidades; inclui exemplo, limites e quiz. Na arena, Juntar forças acrescenta até 5 HP a um aliado vivo ferido por 1 mana. Atributos iniciais sem balanceamento. Acesso: `/#carta/soma`. As duas raças podem integrar a mesma equipe.

## Continuar o projeto

- Produto, requisitos e roadmap: [PRD.md](PRD.md).
- Cartas e fontes: [src/cards.js](src/cards.js).
- Comportamento da interface: [src/app.js](src/app.js).
- Estilo: [src/style.css](src/style.css).
- Motor de combate e validações: [src/battle.js](src/battle.js).
- Atributos e poderes: [src/combat-cards.js](src/combat-cards.js).
- Arena: [src/arena.js](src/arena.js) e [src/arena.css](src/arena.css).
- Regras, metodologia e limitações do equilíbrio: [docs/BATALHA.md](docs/BATALHA.md).
- Resultados reproduzíveis: [docs/balance-report.json](docs/balance-report.json), gerados por `npm run balance`.
- Decisões visuais específicas: [design-system/arcana/pages/collection.md](design-system/arcana/pages/collection.md).
- Prompts completos e registro da ferramenta integrada de geração: [docs/art-prompts.json](docs/art-prompts.json).
- Imagens geradas: [public/art/](public/art/).

Para uma nova carta, crie um objeto seguindo as cartas existentes, use um ID estável, inclua fontes/limites/desafio, adicione a imagem e uma entrada em `combat-cards.js`, e atualize os totais de edição no HTML e no template de carta. Execute verificações funcionais e revise a carta em celular e desktop. Por preferência do usuário, não execute simulações nem ajuste o equilíbrio das cartas até ele pedir o grande balanceamento. Ao mudar regras incompatíveis com partidas salvas, incremente `RULES.version`.

As cartas de busca por palavra e busca híbrida compartilham ilustrações de sua família nesta edição. PNGs são originais e precisam de variantes otimizadas antes de produção. Fontes Google são opcionais, com fallbacks locais. O projeto não depende de Godot ou Three.js neste marco; a justificativa está no PRD.

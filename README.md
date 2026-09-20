# Arcana — Crônicas do Conhecimento

Protótipo de uma coleção de cartas educativas de alta fantasia. Oito cartas de Engenharia de IA com seis ilustrações originais, conceitos fundamentados, limites das analogias e desafios.

## Executar

Requer Node.js 22 ou superior. Não é necessário instalar pacotes.

```sh
npm run dev
```

Abra http://localhost:4173. Use `PORT` para selecionar outra porta. O servidor escuta apenas em loopback e é destinado a desenvolvimento local. Para hospedar estaticamente, publique `index.html`, `src/`, `public/` e `PRD.md` na raiz do site.

## Verificar

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

O grimório fica no `localStorage` deste navegador; não há conta ou sincronização. Os desafios não persistem pontuação. Mana e habilidades são propostas para o futuro jogo. Duelos ainda não foram implementados.

## Continuar o projeto

- Produto, requisitos e roadmap: [PRD.md](PRD.md).
- Cartas e fontes: [src/cards.js](src/cards.js).
- Comportamento da interface: [src/app.js](src/app.js).
- Estilo: [src/style.css](src/style.css).
- Decisões visuais específicas: [design-system/arcana/pages/collection.md](design-system/arcana/pages/collection.md).
- Prompts completos e registro da ferramenta integrada de geração: [docs/art-prompts.json](docs/art-prompts.json).
- Imagens geradas: [public/art/](public/art/).

Para uma nova carta, crie um objeto seguindo as oito existentes, use um ID estável, inclua fontes/limites/desafio, adicione a imagem e atualize os totais de edição no HTML e no template de carta. Execute os testes e revise a carta em celular e desktop.

As cartas de busca por palavra e busca híbrida compartilham ilustrações de sua família nesta edição. PNGs são originais e precisam de variantes otimizadas antes de produção. Fontes Google são opcionais, com fallbacks locais. O projeto não depende de Godot ou Three.js neste marco; a justificativa está no PRD.

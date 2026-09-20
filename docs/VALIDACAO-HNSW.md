# Carta HNSW — validação v0.3

## Conteúdo e arte

- Carta 009: Cartógrafa dos Mil Caminhos, Invocação Épica, Navegantes da Ordem dos Caminhos Suspensos.
- Descrição conferida com o artigo original de Malkov e Yashunin: https://arxiv.org/abs/1603.09320. Explica grafo de proximidade em camadas, busca aproximada, uso com embeddings e limites; distingue o poder fictício do algoritmo.
- Arte gerada pela ferramenta integrada `image_gen` em 20/09/2026 e copiada para `public/art/hnsw.png`. Prompt completo em `hnsw-art-prompt.json` e no manifesto `art-prompts.json`.
- Personagem e cenário próprios, sem referência solicitada a franquias ou artistas. Isso não constitui garantia de exclusividade jurídica.

## Validação funcional

- 22 testes passaram: integridade do catálogo, busca por HNSW e por “salto hierárquico”, favoritos e quatro cenários específicos de combate.
- Motor: salto escolhe outro inimigo vivo de menor HP; desempate por posição. Respeita escudos, cartas eliminadas, alvo único, fraqueza e marcas. Pode encerrar o duelo com duas eliminações.
- Navegador: URL `/#carta/hnsw`, arte carregada, numeração 009/009, quiz respondido corretamente e carta adicionada ao grimório.
- Busca “HNSW” retornou uma carta; contadores gerais mostraram nove cartas. A carta foi selecionada para uma equipe local de três.
- Poder testado pela interface: 4 de dano em Espelho das Respostas e salto de 2 em Sussurro do Palantír; logs exibiram o nome completo da Cartógrafa.
- Painel inspecionado visualmente em desktop e a 375 × 812. Título e arte legíveis, sem overflow horizontal da página ou do painel.
- Balanceamento final e limitações metodológicas estão em `BATALHA.md` e `balance-report.json`. As estatísticas das oito cartas anteriores foram preservadas.

Não houve teste em dispositivo físico nem sessão de partidas humanas nesta entrega.

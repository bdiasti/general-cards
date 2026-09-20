# Validação da v0.1

Executada em 20/09/2026 no ambiente local Windows / Node.js 22.12.0.

## Verificações aprovadas

- `npm run check`: sintaxe de app, catálogo e servidor.
- `npm test`: 5 testes aprovados; nenhum erro. Cobertura de integridade editorial, arte existente, fontes, relações, busca, filtros combinados, ordenação e saneamento do estado salvo.
- Navegador: busca com acentos/caixa normalizados, filtro de Maldições, estado vazio, ordenação por mana, adicionar/remover favorito, filtro do grimório e persistência após navegação/recarregamento.
- Painel: URL direta, leitura de conceito e limites, resposta incorreta, nova tentativa, resposta correta, navegação para carta relacionada e fechamento.
- Teclado real no navegador: Enter abre a carta focada; seta direita muda a aba; Escape fecha e restaura foco ao botão de origem.
- Console do navegador: zero erros e zero avisos na consulta realizada.
- Todos os 11 elementos de imagem da página (6 arquivos distintos) carregaram com dimensões válidas.
- Layout em frames de 360, 375, 650, 768, 1024 e 1440 px: sem overflow horizontal e sem títulos ultrapassando a área de arte. Colunas: 2/2/2/3/4/4, respectivamente.
- Painel de detalhes a 375 px: abriu sem overflow horizontal.
- Inspeção visual em capturas de desktop e celular. Corrigido corte dos nomes de duas linhas e scrollbar desnecessária na faixa de reinos.

## Evidências

- `artifacts/arcana-desktop.png`: página completa, artes carregadas e títulos corrigidos.
- `artifacts/arcana-mobile.png`: primeira dobra a 375 px.
- `artifacts/arcana-mobile-collection.png`: coleção a 375 px.

As duas capturas mobile foram feitas antes do ajuste final para ocultar a barra de rolagem da faixa de reinos e ampliar o botão de favorito. A captura inicial também registra foco no link de pular para a coleção.

## Limites desta validação

Frames responsivos não substituem testes em dispositivos físicos. Não foram executadas auditoria completa WCAG, medições de Core Web Vitals, teste com leitor de tela, teste de zoom 200%, emulação de preferência de movimento reduzido ou revisão técnica independente. A regra CSS de movimento reduzido existe, mas não foi verificada com emulação nesta rodada. PNGs originais precisam de otimização para produção. Mecânicas de duelo não estão implementadas ou balanceadas.

O runner padrão tentou iniciar subprocessos e recebeu EPERM neste ambiente; a configuração usa `--experimental-test-isolation=none`, executando os cinco testes com sucesso no mesmo processo.

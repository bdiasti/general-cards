# Matemática — Caixa de Ferramentas

Entrega v0.5: segunda raça/área de conhecimento, inaugurada pela carta 011, Soma, a Primeira Ferramenta. A temática Caixa de Ferramentas representa conceitos reutilizáveis para resolver problemas. Não há outras cartas matemáticas nesta entrega.

## Conteúdo e arte

- Fonte: OpenStax, Prealgebra 2e, seção 1.2 (Add Whole Numbers).
- Conteúdo: parcelas, total, troca de ordem, soma com zero, exemplo e quiz. O limite separa contagem de grupos distintos de contagem duplicada e distingue limite de HP de propriedade matemática.
- Arte gerada com a ferramenta integrada image_gen; prompt em soma-art-prompt.json e arquivo public/art/soma.png. Inspeção: caixa de ferramentas, símbolo de mais e grupos de 2, 3 e 5 contas.
- HP 16, ataque 2, poder Juntar forças por 1 mana: cura até 5 HP de um aliado vivo ferido. Reutiliza o efeito de cura existente.

## Verificação funcional

- Carta aberta por link direto, arte e identificação Matemática visíveis, quiz com resposta 7 validado no navegador.
- Busca por Caixa de Ferramentas combinada com raça Matemática, tipo Artefato e favoritos retorna somente Soma.
- Atlas apresenta as duas áreas; Explorar Matemática retorna 1 carta; Engenharia de IA retorna 10.
- A 375 × 812, filtros de raça ficam em duas linhas e Matemática permanece visível; página e painel da carta não têm overflow horizontal. A seção de cartas relacionadas fica oculta por não haver outra carta matemática ainda.
- Motor: equipe mista com Soma cura Guardião dos Arquivos de 14 para 19 HP, gasta 1 mana e reproduz o mesmo estado ao restaurar o replay.
- Nenhuma simulação de equilíbrio foi executada e nenhum atributo das cartas anteriores foi ajustado. O relatório de balanceamento v0.3 permanece histórico.

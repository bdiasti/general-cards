# Arcana — decisões do catálogo

Estas decisões específicas prevalecem sobre as recomendações genéricas de MASTER.md.

- Identidade: biblioteca de alta fantasia, verde floresta escuro, ouro envelhecido, pergaminho nas cartas.
- Tipografia: Cormorant Garamond para títulos e nomes; Manrope para interface. Fallbacks Georgia e Segoe UI. A página funciona sem baixar fontes externas.
- Layout: navegação superior, introdução editorial, três cartas em destaque, catálogo com filtros e quatro colunas no desktop, três no tablet e duas no celular.
- Ilustração: arte generativa original, com reaproveitamentos declarados no alfa inicial. A expansão Matemática tem uma ilustração própria para Soma: caixa de ferramentas, dois grupos de contas e um total reunido.
- Componentes 3D/WebGL não são necessários neste marco. Profundidade usa CSS; texto e controles permanecem no DOM.
- Cores: fundo #101713; texto #eeeade; texto secundário #a4aea4; ação #d2b477 com texto #192019; contorno #303b2f.
- Estados: resultados vazios, carta salva, resposta correta/incorreta, armazenamento indisponível, navegação por link direto.
- Acessibilidade: HTML semântico, dialog nativo, navegação por teclado e setas em abas, Escape para fechar, foco visível, redução de movimento e layout responsivo.
- Áreas: cada raça representa uma área de conhecimento. Engenharia de IA, Matemática e Soft-skill têm filtros reais, contagens derivadas do catálogo e entradas no Atlas. Caixa de Ferramentas é um tema de Matemática; Jornada Compartilhada é um tema de Soft-skill. O símbolo de Soft-skill mostra duas pessoas em companhia, usando o mesmo traço SVG da interface.
- Filtros: raça, tipo, busca e favoritos se combinam. Alternar Meu grimório preserva os demais filtros; Explorar cartas e o reset do estado vazio restauram todos os filtros e a ordenação inicial. Os botões de filtro expõem `aria-pressed` e continuam visíveis com quebra de linha no celular.
- Destaque editorial: Soft-skill / Jornada Compartilhada, com Nilo, o Companheiro Leal, na carta frontal e CTA direto ao detalhe. HNSW e Soma mantêm as demais áreas presentes no trio. Saberes conectados só aparece quando há relações publicadas. Uma carta pode oferecer fontes complementares no mesmo estilo da fonte principal.
- Escopo: coleção educativa e arena local. Detalhes das cartas ficam no painel de leitura. Novos atributos de combate são iniciais; a revisão geral de equilíbrio ocorrerá quando solicitada.

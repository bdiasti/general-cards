# Soft-skill — Jornada Compartilhada

Entrega v0.6: terceira raça/área de conhecimento. Carta 012: Nilo, o Companheiro Leal, um hobbit que representa humildade, inteligência emocional e parceria em TI, com foco no valor entregue ao cliente e à empresa.

## Conteúdo e arte

- Fontes: princípios do Manifesto Ágil (colaboração e valor) e Salovey e Mayer, Emotional Intelligence (1990), disponível no repositório da University of New Hampshire.
- A narrativa adapta a inspiração de lealdade de Sam em um personagem de Arcana. Repertório FANT-002 registra a ideia; FANT-001 continua disponível e não foi usado nesta carta.
- O conteúdo distingue humildade de submissão, e superar disputas políticas internas de ignorar segurança, ética e responsabilidades.
- Arte criada com image_gen, salva em public/art/humildade.png; prompt em humildade-art-prompt.json. Mostra o pequeno companheiro ajudando outro viajante com ferramentas, rumo a uma aldeia.

## Verificação funcional

- Detalhe da carta e arte inspecionados em desktop e a 375 × 812; filtro Soft-skill visível e sem overflow horizontal da página.
- Conceito real exibe as duas fontes; quiz respondido corretamente no navegador.
- Duelo pela interface: Espelho das Respostas causou 3 de dano e fraqueza na Cartógrafa. Nilo usou Ombro a ombro; a Cartógrafa passou de 15 para 18 HP e perdeu fraqueza. A cura respeitou seu máximo.
- Testes do motor cobrem alvos válidos, proibição de autoapoio e ressuscitar, cura limitada, preservação de outros efeitos e replay com equipe mista.
- Atributos iniciais: 20 HP, ataque 2, custo 2 mana. Nenhuma simulação de equilíbrio ou alteração nos atributos anteriores.

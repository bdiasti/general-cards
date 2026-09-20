# Arena dos Saberes — regras e balanceamento v0.3

## Formato

Três cartas distintas por lado, escolhidas entre nove cartas gratuitas. Cada carta ocupa uma vaga; raridade não altera atributos. Feitiços, artefatos e maldições também são combatentes nesta arena. Modos: computador e duas pessoas no mesmo aparelho. Não há multiplayer online, conta ou ranking.

Uma ação por carta viva por rodada, alternando os jogadores. Se um lado ficar sem cartas prontas, o outro termina suas ações. Iniciativa sorteada na primeira rodada, alternada nas seguintes; revanche inverte a iniciativa inicial. Vence quem elimina o outro time. Efeitos simultâneos podem empatar.

Cada equipe recebe 3 de mana ao começar a rodada, sem acumular. Ataque básico e defesa são gratuitos. Defesa concede 3 de escudo até a próxima rodada; não acumula com outros escudos (vale o maior). Poderes custam mana, consomem a ação e ficam bloqueados na rodada seguinte. Cura não ressuscita nem excede HP máximo.

Escudo, marca e fraqueza expiram no início da próxima rodada. Marca concede +2 ao próximo golpe; fraqueza reduz em 2 cada acerto da próxima ação ofensiva, com dano base mínimo zero. Veneno causa 2 no início das próximas duas rodadas, ignora escudo e não acumula (reaplicação renova duração). A tempestade começa na rodada 9 com 1 de dano e cresce 1 por rodada, ignorando escudos. Limite de segurança: 20 rodadas.

O **Salto hierárquico** da Cartógrafa dos Mil Caminhos causa 4 de dano ao inimigo escolhido e 2 a outro inimigo vivo com menor HP atual. Em empate, escolhe a posição mais à esquerda da equipe. O alvo principal nunca recebe o salto; cartas eliminadas são ignoradas. Sem outro inimigo vivo, o segundo acerto não acontece. Derrotar o alvo principal não interrompe o salto. Ambos os acertos respeitam escudos. Fraqueza reduz o dano base de cada acerto em 2 e é consumida uma vez pelo poder; a marca de cada alvo acrescenta 2 ao seu próprio acerto e é consumida mesmo quando o escudo absorve o dano. A seleção do alvo adicional usa HP, sem descontar escudos. Mana e recarga seguem a regra dos demais poderes.

## Atributos finais

| Carta | HP | Ataque | Mana do poder | Poder |
|---|---:|---:|---:|---|
| Guardião dos Arquivos | 20 | 3 | 2 | Cura 6 de um aliado vivo |
| Sentinela das Runas | 25 | 3 | 2 | Dano 4 e escudo próprio 2 |
| Tecelã de Significados | 16 | 4 | 2 | Dano 6 ignorando escudo |
| Estrategista do Conselho | 16 | 4 | 2 | Dano 4 e marca +2 para o próximo golpe |
| Chave da Palavra Exata | 15 | 4 | 1 | Dano 5; facilita combinar poderes |
| Aliança dos Dois Saberes | 16 | 3 | 2 | Dano 4 e cura 3 do aliado mais ferido |
| Sussurro do Palantír | 21 | 3 | 2 | Dano 2 e veneno por 2 rodadas |
| Espelho das Respostas | 23 | 3 | 2 | Dano 3 e fraqueza no próximo golpe |
| Cartógrafa dos Mil Caminhos | 18 | 3 | 2 | Dano 4 no alvo e 2 em outro inimigo vivo com menor HP |

## Simulação reproduzível

`npm run balance` usa a semente 20260920 e executa todos os pares diferentes entre as 84 equipes possíveis, duas vezes por par, invertendo a iniciativa. São 6.972 partidas. Ambos os lados usam o mesmo bot tático, que avalia HP, sobrevivência, ataque e efeitos, com desempates pseudoaleatórios. Empate vale meio ponto. O relatório é gerado em `docs/balance-report.json`. `node scripts/balance.mjs --quick` usa aproximadamente um quinto dos pares para uma verificação inicial, sem substituir o relatório completo.

- Iniciativa inicial: **52,23% dos pontos**.
- Média: **8,08 rodadas**; máximo observado: **15**.
- Empates: **119 / 6.972**.
- Pontuação das equipes contendo cada carta: RAG 52,71%; lexical 51,34%; semântica 50,95%; agente 49,33%; palavra 48,61%; híbrida 46,97%; veneno 50,26%; contaminação 50,95%; **HNSW 48,88%**. Cada carta aparece em 4.648 participações de equipes.
- Melhor formação desse bot: Sentinela + Sussurro + Cartógrafa, **68,07%** em 166 jogos. Nem toda composição tem a mesma força; o resultado agregado por carta não mede a força de uma formação específica.

As primeiras amostras da arena revelaram vantagem para a Chave e para combinações de ataque; a versão anterior ajustou ataque, suporte e resistência. Na inclusão de HNSW, mantivemos os atributos das oito cartas existentes. A Cartógrafa começou com 20 HP, mas alcançou 55,71% na simulação completa; reduzimos apenas seu HP para 18 e repetimos a simulação. Os atributos da tabela são os usados no relatório final.

## Limites e próximos ajustes

Simulação não comprova equilíbrio universal nem diversão. As partidas usam um bot heurístico, uma semente e formações sem repetição; não representam todos os estilos humanos. O bot não aprende nem antecipa longas sequências, e sua avaliação pode favorecer algumas mecânicas. A mesma carta pode aparecer nos dois lados; os percentuais agregados são descritivos, não amostras estatísticas independentes.

Próximo ciclo: partidas humanas, comparação de outras estratégias de bot e sementes, feedback sobre clareza e duração, e análise das combinações mais fortes. Alterações incompatíveis exigem incrementar `RULES.version` para invalidar replays antigos com segurança.

## Implementação e persistência

`battle.js` é um motor puro: ações inválidas são rejeitadas sem mutação. A UI utiliza as mesmas ações legais, e o computador também. Para avaliar jogadas hipotéticas, o bot descarta cópias do histórico e do log; o tabuleiro, as regras e a avaliação são idênticos aos usados nas ações reais. `combat-cards.js` é a fonte única de atributos exibidos no catálogo, montagem e duelo. O replay local guarda equipes, iniciativa e ações, reconstruindo e validando cada transição. A inclusão da nova carta preserva replays das oito cartas anteriores. Falhas de armazenamento não impedem jogar na aba atual.

# Arena dos Saberes — regras e balanceamento v0.2

## Formato

Três cartas distintas por lado, escolhidas entre oito cartas gratuitas. Cada carta ocupa uma vaga; raridade não altera atributos. Feitiços, artefatos e maldições também são combatentes nesta arena. Modos: computador e duas pessoas no mesmo aparelho. Não há multiplayer online, conta ou ranking.

Uma ação por carta viva por rodada, alternando os jogadores. Se um lado ficar sem cartas prontas, o outro termina suas ações. Iniciativa sorteada na primeira rodada, alternada nas seguintes; revanche inverte a iniciativa inicial. Vence quem elimina o outro time. Efeitos simultâneos podem empatar.

Cada equipe recebe 3 de mana ao começar a rodada, sem acumular. Ataque básico e defesa são gratuitos. Defesa concede 3 de escudo até a próxima rodada; não acumula com outros escudos (vale o maior). Poderes custam mana, consomem a ação e ficam bloqueados na rodada seguinte. Cura não ressuscita nem excede HP máximo.

Escudo, marca e fraqueza expiram no início da próxima rodada. Marca concede +2 ao próximo golpe; fraqueza reduz em 2 o próximo golpe ofensivo, com dano base mínimo zero. Veneno causa 2 no início das próximas duas rodadas, ignora escudo e não acumula (reaplicação renova duração). A tempestade começa na rodada 9 com 1 de dano e cresce 1 por rodada, ignorando escudos. Limite de segurança: 20 rodadas.

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

## Simulação reproduzível

`npm run balance` usa a semente 20260920 e executa todos os pares diferentes entre as 56 equipes possíveis, duas vezes por par, invertendo a iniciativa. São 3.080 partidas. Ambos os lados usam o mesmo bot tático, que avalia HP, sobrevivência, ataque e efeitos, com desempates pseudoaleatórios. Empate vale meio ponto. O relatório é gerado em `docs/balance-report.json`.

- Iniciativa inicial: **51,12% dos pontos**.
- Média: **8,31 rodadas**; máximo observado: **14**.
- Empates: **65 / 3.080**.
- Pontuação das equipes contendo cada carta: RAG 51,36%; lexical 49,13%; semântica 52,27%; agente 50,04%; palavra 48,83%; híbrida 47,92%; veneno 50,91%; contaminação 49,52%.
- Melhor formação desse bot: Sentinela + Estrategista + Sussurro, **69,55%** em 110 jogos. Nem toda composição tem a mesma força; o resultado agregado por carta não mede a força de uma formação específica.

As primeiras amostras revelaram vantagem para a Chave e para combinações de ataque. Reduzimos HP dos ofensivos e compensamos controle/defesa com resistência. Depois ajustamos suporte e guardião. Os atributos da tabela são os usados no relatório final.

## Limites e próximos ajustes

Simulação não comprova equilíbrio universal nem diversão. As partidas usam um bot heurístico, uma semente e formações sem repetição; não representam todos os estilos humanos. O bot não aprende nem antecipa longas sequências, e sua avaliação pode favorecer algumas mecânicas. A mesma carta pode aparecer nos dois lados; os percentuais agregados são descritivos, não amostras estatísticas independentes.

Próximo ciclo: partidas humanas, comparação de outras estratégias de bot e sementes, feedback sobre clareza e duração, e análise das combinações mais fortes. Alterações incompatíveis exigem incrementar `RULES.version` para invalidar replays antigos com segurança.

## Implementação e persistência

`battle.js` é um motor puro: ações inválidas são rejeitadas sem mutação. A UI utiliza as mesmas ações legais, e o computador também. `combat-cards.js` é a fonte única de atributos exibidos no catálogo, montagem e duelo. O replay local guarda equipes, iniciativa e ações, reconstruindo e validando cada transição. Falhas de armazenamento não impedem jogar na aba atual.

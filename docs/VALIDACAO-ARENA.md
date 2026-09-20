# Validação da arena v0.2 — 20/09/2026

- `npm run check`: sintaxe da coleção, arena, catálogo de combate, motor e servidor.
- `npm test`: 17 testes aprovados, incluindo 12 do motor. Cobrem ações inválidas, mana, cura, escudo, recarga, veneno, marca, fraqueza, vitória, empate, limite de duração e replay.
- `npm run balance`: 3.080 partidas, 56 formações; relatório final em `balance-report.json`.
- Navegador: montagem manual das duas equipes, transição para a equipe 2, início, seleção de carta, poder e alvo. Fio astral aplicou 6 de dano e consumiu 2 de mana; turno passou ao rival.
- Duelo local completo no navegador, usando os botões reais: poderes, ataques, alvos com menor HP, efeitos e recarga até vitória do jogador 2. Nenhum erro/aviso no console consultado.
- Recarregar + retomar reproduziu a ação anterior e o estado de HP/mana. Revanche restaurou HP e inverteu a iniciativa inicial.
- Computador: equipe sorteada, turno inicial com controles bloqueados e resposta automática; após o ataque, controles do jogador ficaram disponíveis.
- Layout inspecionado em celular de 375 × 812 e desktop de 1440 × 960; verificação adicional de overflow em 812 × 375. Sem rolagem horizontal detectada nos estados verificados.

Limites: emulação não substitui dispositivos reais. Não houve sessão com dois participantes humanos, auditoria completa de acessibilidade, teste de leitor de tela ou medição de diversão. Movimento reduzido é respeitado pelo CSS, sem emulação específica nesta rodada. PNGs originais continuam grandes, conforme o registro da v0.1.

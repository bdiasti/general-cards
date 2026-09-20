// One slot per card: rarity never changes combat strength.
export const combatCards = {
  siege: { hp: 20, attack: 3, role: 'Vigilância', cost: 2, power: 'Brecha e Barreira', target: 'enemy', text: 'Causa 3 de dano ignorando o escudo do alvo e recebe 2 de escudo até a próxima rodada. Não acumula com escudo existente.', effect: 'siege', value: 3 },
  rag: { hp: 20, attack: 3, role: 'Suporte', cost: 2, power: 'Memória restauradora', target: 'ally', text: 'Restaura 6 HP de um aliado vivo, sem ultrapassar o máximo.', effect: 'heal', value: 6 },
  lexical: { hp: 25, attack: 3, role: 'Guardião', cost: 2, power: 'Muralha de runas', target: 'enemy', text: 'Causa 4 de dano e recebe 2 de escudo até a próxima rodada.', effect: 'bulwark', value: 4 },
  semantic: { hp: 16, attack: 4, role: 'Duelista', cost: 2, power: 'Fio astral', target: 'enemy', text: 'Causa 6 de dano, ignorando o escudo do alvo.', effect: 'pierce', value: 6 },
  agent: { hp: 16, attack: 4, role: 'Estrategista', cost: 2, power: 'Plano do conselho', target: 'enemy', text: 'Causa 4 de dano e marca o alvo: o próximo golpe recebe +2 de dano nesta rodada.', effect: 'mark', value: 4 },
  keyword: { hp: 15, attack: 4, role: 'Especialista', cost: 1, power: 'Golpe preciso', target: 'enemy', text: 'Causa 5 de dano por apenas 1 de mana. Combine com o poder de um aliado.', effect: 'strike', value: 5 },
  hybrid: { hp: 16, attack: 3, role: 'Equilíbrio', cost: 2, power: 'Convergência vital', target: 'enemy', text: 'Causa 4 de dano e restaura 3 HP do aliado vivo mais ferido, incluindo esta carta.', effect: 'drain', value: 4 },
  poison: { hp: 21, attack: 3, role: 'Desgaste', cost: 2, power: 'Runas corrompidas', target: 'enemy', text: 'Causa 2 de dano e aplica veneno: 2 de dano no início das próximas 2 rodadas. Não acumula.', effect: 'poison', value: 2 },
  contamination: { hp: 23, attack: 3, role: 'Controle', cost: 2, power: 'Reflexo incerto', target: 'enemy', text: 'Causa 3 de dano. Cada acerto do próximo ataque ou poder ofensivo do alvo causa 2 a menos nesta rodada.', effect: 'weaken', value: 3 },
  hnsw: { hp: 18, attack: 3, role: 'Exploradora', cost: 2, power: 'Salto hierárquico', target: 'enemy', text: 'Causa 4 de dano ao alvo e 2 a outro inimigo vivo com menor HP. Empates seguem a posição; ambos respeitam escudos.', effect: 'hop', value: 4, splash: 2 },
};
export const RULES = Object.freeze({ teamSize: 3, mana: 3, cooldown: 2, shield: 3, stormRound: 9, maxRounds: 20, version: 1 });

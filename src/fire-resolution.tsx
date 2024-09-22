import {State} from "./state.ts";

type TacticalPosition = 'SD' | 'D' | 'A' | 'SA';
const tpd: TacticalPosition[][] = [
  ['SD', 'SD', 'SD', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
  ['SD', 'SD', 'SD', 'D', 'D', 'D', 'D', 'D', 'D', 'A'],
  ['SD', 'SD', 'D', 'D', 'D', 'D', 'D', 'A', 'A', 'A'],
  ['SD', 'D', 'D', 'D', 'D', 'D', 'A', 'A', 'A', 'A'],
  ['SD', 'D', 'D', 'A', 'A', 'A', 'A', 'A', 'A', 'SA'],
  ['D', 'D', 'D', 'A', 'A', 'A', 'A', 'A', 'SA', 'SA'],
  ['D', 'D', 'D', 'A', 'A', 'A', 'SA', 'SA', 'SA', 'SA'],
  ['D', 'D', 'D', 'A', 'A', 'A', 'SA', 'SA', 'SA', 'SA'],
  ['D', 'D', 'A', 'A', 'A', 'SA', 'SA', 'SA', 'SA', 'SA'],
  ['A', 'A', 'A', 'A', 'SA', 'SA', 'SA', 'SA', 'SA', 'SA'],
] as const;

type Result = 'Counter Attack' | 'Defender Retreat' | 'Defender Blown' | 'Breakthrough*'
  | 'Attacker Retreat' | 'Attacker Blown' | 'Disaster*';
const attackResultTable: { [attacker in TacticalPosition]: { [defender in TacticalPosition]: Result } } = {
  SD: {
    SD: 'Counter Attack',
    D: "Defender Retreat",
    A: 'Defender Blown',
    SA: 'Breakthrough*'
  },
  D: {
    SD: "Attacker Retreat",
    D: "Counter Attack",
    A:'Defender Retreat',
    SA: 'Defender Blown'
  },
  A:{
    SD:'Attacker Blown',
    D:'Attacker Retreat',
    A:'Attacker Retreat',
    SA:'Defender Retreat'
  },
  SA:{
    SD:'Disaster*',
    D:'Attacker Blown',
    A:'Attacker Retreat',
    SA:'Attacker Retreat'
  }
}

export function fireResolution(state: State) {
  let attacker = 1;
  let defender = 1;
  attacker += state.attackArty === 'yes' ? 3 : 0;
  defender += state.defArty === 'yes' ? 4 : 0;
  defender += state.defenderTerrain === 'defensible' ? 3 : 0;
  if (state.defenderTerrain === 'entr. front' || state.defenderTerrain === 'def. in fort') {
    defender += 5
  }
  attacker += state.hqAttackStars === 'yes' ? 1 : 0;
  defender += state.hqDefStars === 'yes' ? 1 : 0;
  attacker += state.attackStars ?? 0;
  defender += state.defStars ?? 0;
  attacker += state.attackSupport === 'yes' ? 2 : 0;
  attacker += state.attackIntegrity === 'yes' ? 1 : 0;
  defender += state.defIntegrity === 'yes' ? 1 : 0;
  attacker += state.defDetachment === 'yes' ? 4 : 0;

  const attackerTacticalPosition = tpd[state.attackRoll ?? 0][Math.min(attacker,10)-1]
  const defenderTacticalPosition = tpd[state.defenderRoll ?? 0][Math.min(defender,10)-1]
  const defenderRow = attackResultTable[attackerTacticalPosition] ?? {};
  return {
    attacker,
    defender,
    attackerTacticalPosition,
    defenderTacticalPosition,
    result: defenderRow[defenderTacticalPosition],
  };
}
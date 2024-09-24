export function firepowerDef(index: number) {
  return {
    label: `Firepower${index + 1}`,
    values: [
      index == 0 ? '+' : 0,
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ],
  } as const
}

export const pickOneDefs = {

  defenderTerrain: {
    label: 'Defender Terrain',
    values: ['defensible', 'entr. front', 'def. in fort'],
  },
  attackStars: {
    label: 'Attacker stars',
    values: [1, 2, 3, 4, 5]
  },
  defStars: {
    label: 'Defender stars',
    values: [1, 2, 3, 4, 5]
  },
  attackHqStars: {
    label: 'Attack HQ Stars',
    values: [1, 2, 3]
  },
  defenderHqStars: {
    label: 'Defender HQ Stars',
    values: [1, 2, 3]
  },
  attackRoll: {
    label: 'Attacker roll',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  defenderRoll: {
    label: 'Defender roll',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
} as const;
export const pickManyDefs = {
  arty: {
    label: 'Artillery',
    values: ['attacker', 'defender']
  },
  integrity: {
    label: 'Division integrity',
    values: ['attacker', 'defender']
  },
  other: {
    label: '',
    values: ['attack support', 'counter attack','is detachment']
  },
} as const;

type TPickOne = typeof pickOneDefs;
type TPickMany = typeof pickManyDefs;

export type SingleSelectionFields = keyof TPickOne;
export type MultipleSelectionFields = keyof TPickMany;

export type State = {
  [key in SingleSelectionFields]?: TPickOne[key]['values'][number]
} & {
  [key in MultipleSelectionFields]: TPickMany[key]['values'][number][]
};

export const initialState: State = {
  arty: [],
  integrity: [],
  other: [],
}
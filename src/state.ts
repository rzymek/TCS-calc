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
    attackArty: {
        label: 'Attack Arty',
        values: ['yes','no']
    },
    defArty: {
        label: 'Def Arty',
        values: ['yes','no']
    },
    defenderTerrain: {
        label: 'Def Terrain',
        values: ['defensible','entr. front','def. in fort'],
    },
    hqAttackStars:{
        label: 'Attacker HQ Stars',
        values: ['yes','no']
    },
    hqDefStars:{
        label: 'Defender HQ Stars',
        values: ['yes','no']
    },
    attackStars:{
        label: 'Attacker stars',
        values: [0,1,2,3,4,5]
    },
    defStars: {
        label: 'Defender stars',
        values: [0, 1, 2, 3, 4, 5]
    },
    attackSupport: {
        label: 'Attack support',
        values: ['yes','no']
    },
    attackIntegrity: {
        label: 'Att.integrity',
        values: ['yes','no']
    },
    defIntegrity: {
        label: 'Def.integrity',
        values: ['yes','no']
    },
    defDetachment: {
        label: 'Defender detachment',
        values: ['yes','no']
    },
} as const;
export const pickManyDefs = {
    // firererEnv: {
    //     label: 'Firerer Env',
    //     values: ['any sup/par', 'cross fire', 'arty zone', 'smoke']
    // },
} as const;

type TPickOne = typeof pickOneDefs;
type TPickMany = typeof pickManyDefs;

export type SingleSelectionFields = keyof TPickOne;
export type MultipleSelectionFields = keyof TPickMany;

export type State = {
    [key in SingleSelectionFields]?: TPickOne[key]['values'][number]
} & {
    [key in MultipleSelectionFields]: TPickMany[key]['values'][number][]
} ;

export const initialState:State = {
}
import {State} from "./state.ts";


export function fireResolution(state: State) {
    let attacker=1;
    let defender=1;
    attacker += state.attackArty === 'yes' ? 3 : 0;
    defender += state.defArty === 'yes' ? 4 : 0;
    defender += state.defenderTerrain === 'defensible' ? 3 : 0;
    if(state.defenderTerrain === 'entr. front' || state.defenderTerrain === 'def. in fort') {
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
    return {
        attacker,
        defender,
    };
}
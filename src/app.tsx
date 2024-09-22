import './app.css'
import {useCallback, useState} from "preact/compat";
import {Context} from "./context.tsx";
import {PickOne} from "./pickOne.tsx";
import {RollAndResolve} from "./rollAndResolve.tsx";
import {initialState, State} from "./state.ts";
import {FireResolutionResult} from "./firetable.ts";

export function App() {
    const [state, setState] = useState<State>(initialState);
    const [, setResult] = useState<FireResolutionResult>()

    return <Context.Provider value={{
        state,
        update: useCallback((v) => {
            setState(prev => ({
                ...prev,
                ...v
            }))
        }, [])

    }}>
        <PickOne field="attackArty"/>
        <PickOne field="defArty"/>
        <PickOne field="defenderTerrain"/>
        <PickOne field="hqAttackStars"/>
        <PickOne field="hqDefStars"/>
        <PickOne field="attackStars"/>
        <PickOne field="defStars"/>
        <PickOne field="attackSupport"/>
        <PickOne field="attackIntegrity"/>
        <PickOne field="defIntegrity"/>
        <PickOne field="defDetachment"/>

        <RollAndResolve state={state} onResult={setResult}/>

    </Context.Provider>
}

import './app.css'
import {useCallback, useState} from "preact/compat";
import {Context} from "./context.tsx";
import {PickOne} from "./pickOne.tsx";
import {RollAndResolve} from "./rollAndResolve.tsx";
import {initialState, State} from "./state.ts";
import {FireResolutionResult} from "./firetable.ts";
import {PickMany} from "./pickMany.tsx";

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
        <PickMany field="arty"/>
        <PickOne field="defenderTerrain"/>
        <PickOne field="attackHqStars"/>
        <PickOne field="defenderHqStars"/>
        <PickOne field="attackStars"/>
        <PickOne field="defStars"/>
        <PickMany field="other"/>
        <PickMany field="integrity"/>
        <PickOne field="attackRoll"/>
        <PickOne field="defenderRoll"/>

        <RollAndResolve state={state} onResult={setResult}/>

    </Context.Provider>
}

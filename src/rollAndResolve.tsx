import {FireResolutionResult} from "./firetable.ts";
import {fireResolution} from "./fire-resolution.tsx";
import {State} from "./state.ts";

export function RollAndResolve(props: {
    state: State
    onResult(result: FireResolutionResult | undefined): void;
}) {
    const resolution = fireResolution(props.state);

    return <>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                paddingLeft: 5,
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
            <span>
            Attacker: {resolution.attacker}<br/>
            Defender: {resolution.defender}<br/>
            </span>
            </div>
            {/*<Roll2D6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>*/}
        </div>
    </>;
}
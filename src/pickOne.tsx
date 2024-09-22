import {Pick, PickProps} from "./pick.tsx";
import {useContext} from "preact/compat";
import {Context} from "./context.tsx";
import {pickOneDefs, SingleSelectionFields} from "./state.ts";

export function PickOne(props: PickProps & { field: SingleSelectionFields }) {
    const context = useContext(Context);
    const {label, values} = pickOneDefs[props.field];
    const selected = context.state[props.field];

    return <Pick {...props}
                 label={label}
                 values={values}
                 selected={[selected]}
                 onClick={(v: string | number) => {
                     context.update({[props.field]: selected === v ? undefined : v});
                 }}/>;
}

import { useId } from "react";

type Props = {
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    labelText: string
};

/**
 * @description
 * React component that render a form part with an input tag and more
 * 
 * @returns JSX element
 */
function FormInput({ state,setState,labelText }: Props) {
    const labelId = useId();
    const inputId = useId();

    return (
        <div className="employee-form__data-fields">
            <label id={labelId} htmlFor={inputId}>{labelText}</label>

            <input type={labelText === "Zip Code" ? "number" : "text"}
                id={inputId}
                aria-labelledby={labelId}
                value={state}
                onChange={(event) => setState(event.target.value)}
            />
        </div>
    );
}

export default FormInput;
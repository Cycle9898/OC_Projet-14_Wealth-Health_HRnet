import { useId,useState } from "react";
import { checkGenericString,checkZipCodeString } from "../utils/inputValidationFunctions";

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

    const [errorMessage,setErrorMessage] = useState<string | null>(null)

    return (
        <div className="employee-form__data-fields">
            <label id={labelId} htmlFor={inputId}>{labelText}</label>

            <input type="text"
                id={inputId}
                aria-labelledby={labelId}
                value={state}
                onChange={(event) => setState(event.target.value)}
                onBlur={() => labelText === "Zip Code" ?
                    setErrorMessage(checkZipCodeString(state))
                    :
                    setErrorMessage(checkGenericString(state)
                    )}
            />
            {errorMessage && <p className="input-error">{errorMessage}</p>}
        </div>
    );
}

export default FormInput;
import { useId,useState } from "react";
import DatePickerInput from "./DatePickerInput";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { departmentsOptions,statesOptions } from "../utils/data/formDropdownData";
import FormInput from "./FormInput";

/**
 * @description
 * React component that render a form to save entered employee's data
 * 
 * @returns JSX element
 */
function SaveEmployeeDataForm() {
    // ID's
    const usStateLabelId = useId();
    const departmentLabelId = useId();
    // Form elements states
    const [firstName,setFirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [birthDateString,setBirthDateString] = useState<string>("");
    const [startDateString,setStartDateString] = useState<string>("");
    const [street,setStreet] = useState<string>("");
    const [city,setCity] = useState<string>("");
    const [usState,setUsState] = useState<string>("");
    const [zipCode,setZipCode] = useState<string>("");
    const [department,setDepartment] = useState<string>("");

    return (
        <section className="employee-register-section">
            <form className="employee-form" onSubmit={(event) => event.preventDefault()}>
                <FormInput
                    state={firstName}
                    setState={setFirstName}
                    labelText="First Name"
                />

                <FormInput
                    state={lastName}
                    setState={setLastName}
                    labelText="Last Name"
                />

                <DatePickerInput
                    chosenDate={birthDateString}
                    setChosenDate={setBirthDateString}
                    labelText="Date of Birth"
                />

                <DatePickerInput
                    chosenDate={startDateString}
                    setChosenDate={setStartDateString}
                    labelText="Start Date"
                />

                <fieldset>
                    <legend>Address</legend>

                    <FormInput
                        state={street}
                        setState={setStreet}
                        labelText="Street"
                    />

                    <FormInput
                        state={city}
                        setState={setCity}
                        labelText="City"
                    />

                    <div className="employee-form__data-fields">
                        <span id={usStateLabelId}>State</span>

                        <Dropdown
                            displayedValue={usState}
                            setDisplayedValue={setUsState}
                            optionArray={statesOptions}
                            ariaLabelById={usStateLabelId}
                        />
                    </div>

                    <FormInput
                        state={zipCode}
                        setState={setZipCode}
                        labelText="Zip Code"
                    />
                </fieldset>

                <div className="employee-form__data-fields">
                    <span id={departmentLabelId}>Department</span>

                    <Dropdown
                        displayedValue={department}
                        setDisplayedValue={setDepartment}
                        optionArray={departmentsOptions}
                        ariaLabelById={departmentLabelId}
                    />
                </div>
            </form >

            <button className="main-button">Save</button>
        </section>
    );
}

export default SaveEmployeeDataForm;
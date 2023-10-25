import { useId,useState } from "react";
import DatePickerInput from "./DatePickerInput";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { departmentsOptions,statesOptions } from "../utils/data/formDropdownData";
import FormInput from "./FormInput";
import { EmployeeFormFieldsType,ValidateEmployeeForm } from "../utils/inputValidationFunctions";
import ModalMainContainer from "./modal-related/ModalMainContainer";
import EmployeeSavedSubModal from "./modal-related/EmployeeSavedSubModal";
import EmployeeFormErrorSubModal from "./modal-related/EmployeeSaveErrorSubModal";
import { useSaveEmployeeData } from "../utils/hooks/EmployeeFormSaveServices";
import LoadingSpinner from "./LoadingSpinner";

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
    const initialState: string = "";
    const [firstName,setFirstName] = useState<string>(initialState);
    const [lastName,setLastName] = useState<string>(initialState);
    const [birthDateString,setBirthDateString] = useState<string>(initialState);
    const [startDateString,setStartDateString] = useState<string>(initialState);
    const [street,setStreet] = useState<string>(initialState);
    const [city,setCity] = useState<string>(initialState);
    const [usState,setUsState] = useState<string>(initialState);
    const [zipCode,setZipCode] = useState<string>(initialState);
    const [department,setDepartment] = useState<string>(initialState);

    // Modal handling
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
    const [modalSubComponent,setModalSubComponent] = useState<JSX.Element | undefined>();

    // Form functions
    const resetFormFields = () => {
        // Change all form State variables to initial State values
        setFirstName(initialState);
        setLastName(initialState);
        setBirthDateString(initialState);
        setStartDateString(initialState);
        setStreet(initialState);
        setCity(initialState);
        setUsState(initialState);
        setZipCode(initialState);
        setDepartment(initialState);
    }

    const handleFormSubmit = (event?: React.MouseEvent) => {
        // Avoid unwanted click interactions in the modal
        event && event.stopPropagation();

        // Regroup all form fields inside an object
        const allFormFiels: EmployeeFormFieldsType = {
            firstName,
            lastName,
            birthDate: birthDateString,
            startDate: startDateString,
            street,
            city,
            state: usState,
            zipCode,
            department
        };

        // Check form validity before saving data
        if (ValidateEmployeeForm(allFormFiels)) {
            // Save data, open confirmation modal and reset form fields
            saveEmployeeData(allFormFiels);

            setModalSubComponent(<EmployeeSavedSubModal setOpeningStatus={setIsModalOpen} />);
            setIsModalOpen(true);

            resetFormFields();
        } else {
            // Open form error modal
            setModalSubComponent(<EmployeeFormErrorSubModal setOpeningStatus={setIsModalOpen} />);
            setIsModalOpen(true);
        }
    };

    // Save data Hook
    const { isRequestLoading,isRequestError,saveEmployeeData } = useSaveEmployeeData();

    if (isRequestError) {
        return (
            <main className="main">
                <p className="error-msg">Due to a network error, this page could not be loaded.</p>
                <p className="error-msg">Please try again later.</p>
            </main>
        );
    }

    return (
        <>
            {isRequestLoading ? (
                <LoadingSpinner />
            ) : (
                <section className="employee-register-section">
                    <form className="employee-form"
                        onSubmit={(event) => event.preventDefault()}
                        aria-hidden={isModalOpen}
                    >
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

                    <button
                        className="main-button"
                        aria-hidden={isModalOpen}
                        onClick={(event) => handleFormSubmit(event)}
                        onKeyDown={(event) => [" ","Enter"].includes(event.key) && handleFormSubmit()}
                    >
                        Save
                    </button>

                    {isModalOpen && <ModalMainContainer
                        openingStatus={isModalOpen}
                        setOpeningStatus={setIsModalOpen}
                        displayedComponent={modalSubComponent}
                    />}
                </section>)}
        </>
    );
}

export default SaveEmployeeDataForm;
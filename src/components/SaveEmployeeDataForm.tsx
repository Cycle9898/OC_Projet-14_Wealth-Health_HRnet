import { useContext,useId,useState } from "react";
import DatePickerInput from "./DatePickerInput";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { departmentsOptions,statesOptions } from "../utils/data/formDropdownData";
import FormInput from "./FormInput";
import { EmployeeFormFieldsType,ValidateEmployeeForm } from "../utils/inputValidationFunctions";
import ModalMainContainer from "./modal-related/ModalMainContainer";
import EmployeeSavedSubModal from "./modal-related/EmployeeSavedSubModal";
import EmployeeEditedSubModal from "./modal-related/EmployeeEditedSubModal";
import EmployeeFormErrorSubModal from "./modal-related/EmployeeFormErrorSubModal";
import { useSaveEmployeeData } from "../utils/hooks/EmployeeFormSaveServices";
import LoadingSpinner from "./LoadingSpinner";
import { EmployeeDataType,EmployeesContext } from "../utils/context/EmployeesContext";

type Props = {
    employeeId?: string
}

/**
 * @description
 * React component that render a form to save entered employee's data
 * 
 * @param employeeId - Optional - ID of an employee in case the form is rendered on edit employee page
 * 
 * @returns JSX element
 */
function SaveEmployeeDataForm({ employeeId }: Props) {
    // Edit mode related
    const { employeesDataArray } = useContext(EmployeesContext);
    const editedEmployeeData: EmployeeDataType | undefined = employeesDataArray.find((employeeData) => employeeData.id === employeeId);

    // ID's
    const usStateLabelId = useId();
    const departmentLabelId = useId();

    // Form elements states
    const initialState: string = "";
    const [firstName,setFirstName] = useState<string>(editedEmployeeData?.firstName || initialState);
    const [lastName,setLastName] = useState<string>(editedEmployeeData?.lastName || initialState);
    const [birthDateString,setBirthDateString] = useState<string>(editedEmployeeData?.birthDate || initialState);
    const [startDateString,setStartDateString] = useState<string>(editedEmployeeData?.startDate || initialState);
    const [street,setStreet] = useState<string>(editedEmployeeData?.street || initialState);
    const [city,setCity] = useState<string>(editedEmployeeData?.city || initialState);
    const [usState,setUsState] = useState<string>(editedEmployeeData?.state || initialState);
    const [zipCode,setZipCode] = useState<string>(editedEmployeeData?.zipCode || initialState);
    const [department,setDepartment] = useState<string>(editedEmployeeData?.department || initialState);

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
            // Check if an employee is edited or created, save data and open confirmation modal
            if (employeeId) {
                saveEmployeeData(allFormFiels,employeeId);

                setModalSubComponent(<EmployeeEditedSubModal />);
            } else {
                saveEmployeeData(allFormFiels);

                setModalSubComponent(<EmployeeSavedSubModal setOpeningStatus={setIsModalOpen} />);

                resetFormFields();
            }

            setIsModalOpen(true);
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
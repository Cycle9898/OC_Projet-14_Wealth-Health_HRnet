import SaveEmployeeDataForm from "../components/SaveEmployeeDataForm";

/**
 * @description
 * React component that displays the page to register an employee's data
 * 
 * @remarks
 * This page is not accessible without being logged in.
 * 
 * @returns JSX element
 */
function AddEmployeePage() {
    return (
        <main className="main add-employee-page">
            <h2>Create an employee</h2>

            <SaveEmployeeDataForm />
        </main>
    );
}

export default AddEmployeePage;
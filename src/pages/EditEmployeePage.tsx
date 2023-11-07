import { useParams } from "react-router-dom";
import SaveEmployeeDataForm from "../components/SaveEmployeeDataForm";

/**
 * @description
 * React component that displays the page to edit an employee's data
 * 
 * @remarks
 * This page is not accessible without being logged in.
 * 
 * @returns JSX element
 */
function EditEmployeePage() {
    const employeeIdParam: string | undefined = useParams().employeeId;

    return (
        <main className="main add-employee-page">
            <h2>Edit an employee</h2>

            <SaveEmployeeDataForm employeeId={employeeIdParam} />
        </main>
    );
}

export default EditEmployeePage;
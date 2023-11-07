import { useNavigate } from "react-router-dom";

/**
 * @description
 * React component that renders a sub component for the modal container
 * and that display a successfully edited employee confirmation message
 * 
 * @returns JSX Element
 */
function EmployeeSavedSubModal() {
    const navigate = useNavigate();

    return (
        <div className="employee-save-status-sub-modal">
            <p>Employee successfully edited!</p>

            <button onClick={() => navigate("/employees-list")} className="main-button less-visible">
                Return to employees list
            </button>
        </div>
    );
}

export default EmployeeSavedSubModal;
import { FaTriangleExclamation } from "react-icons/fa6";

type Props = {
    setOpeningStatus: React.Dispatch<React.SetStateAction<boolean>>
};

/**
 * @description
 * React component that renders a sub component for the modal container
 * and that display a form error message
 * 
 * @param setOpeningStatus - State method for interact with the modal opening State variable
 * 
 * @returns JSX Element
 */
function EmployeeFormErrorSubModal({ setOpeningStatus }: Props) {
    return (
        <div className="employee-save-status-sub-modal">
            <p>
                <FaTriangleExclamation aria-label="Warning" />
                <span> At least one form field is incomplete or incorrect ! </span>
                <FaTriangleExclamation aria-label="Warning" />
            </p>

            <p>Please check your entries.</p>

            <button onClick={() => setOpeningStatus(false)} className="main-button">
                OK
            </button>
        </div>
    );
}

export default EmployeeFormErrorSubModal;
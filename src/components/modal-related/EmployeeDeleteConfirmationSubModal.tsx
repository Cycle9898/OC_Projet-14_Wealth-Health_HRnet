import { FaCheck,FaXmark } from "react-icons/fa6";
import useDeleteEmployee from "../../utils/hooks/EmployeeDeleteService";

type Props = {
    setOpeningStatus: React.Dispatch<React.SetStateAction<boolean>>,
    deletedEmployeeId: string,
    setDeletedEmployeeId: React.Dispatch<React.SetStateAction<string>>
};

/**
 * @description
 * React component that renders a sub component for the modal container
 * and that display a confirmation message for deleting an employee from the list
 * 
 * @param setOpeningStatus - State method for interact with the modal opening State variable
 * 
 * @returns JSX Element
 */
function EmployeeDeleteConfirmationSubModal({ setOpeningStatus,deletedEmployeeId,setDeletedEmployeeId }: Props) {
    // Confirmation buttons related
    const cleanIdAndCloseModal = () => {
        setDeletedEmployeeId("");
        setOpeningStatus(false);
    }

    const deleteEmployeeHook = useDeleteEmployee();

    const handleDeleteEmployee = () => {
        deleteEmployeeHook(deletedEmployeeId)

        cleanIdAndCloseModal();
    }


    return (
        <div className="employee-delete-confirmation-sub-modal">
            <p>Delete this employee ?</p>

            <p>This action cannot be undone.</p>

            <div className="confirmation-buttons">
                <button className="main-button"
                    onClick={() => handleDeleteEmployee()}>
                    <span className="accept" aria-label="accept">
                        <FaCheck />
                    </span>
                    Yes
                </button>

                <button className="main-button"
                    onClick={() => cleanIdAndCloseModal()}>
                    <span className="decline" aria-label="decline">
                        <FaXmark />
                    </span>
                    No
                </button>
            </div>
        </div>
    );
}

export default EmployeeDeleteConfirmationSubModal;
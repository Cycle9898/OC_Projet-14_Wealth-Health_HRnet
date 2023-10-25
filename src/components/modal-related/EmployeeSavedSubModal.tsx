type Props = {
    setOpeningStatus: React.Dispatch<React.SetStateAction<boolean>>
};

/**
 * @description
 * React component that renders a sub component for the modal container
 * and that display a saved employee confirmation message
 * 
 * @param setOpeningStatus - State method for interact with the modal opening State variable
 * 
 * @returns JSX Element
 */
function EmployeeSavedSubModal({ setOpeningStatus }: Props) {
    return (
        <div className="employee-save-status-sub-modal">
            <p>Employee Created!</p>

            <button onClick={() => setOpeningStatus(false)} className="main-button">
                OK
            </button>
        </div>
    );
}

export default EmployeeSavedSubModal;
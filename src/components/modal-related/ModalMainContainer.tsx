import { useEffect,useRef } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
    openingStatus: boolean,
    setOpeningStatus: React.Dispatch<React.SetStateAction<boolean>>,
    displayedComponent?: JSX.Element
};

/**
 * @description
 * React component that renders an empty generic modal which
 * will then display content from another component passed in Props
 * 
 * @param openingStatus - State variable that represent the opening state of the modal
 * @param setOpeningStatus - State method for interact with openingStatus State variable
 * @param displayedComponent - React component that will be displayed inside this component
 * 
 * @returns JSX element
 */
function ModalMainContainer({ openingStatus,setOpeningStatus,displayedComponent }: Props) {
    // Ref
    const modalBody: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const closeBtn: React.MutableRefObject<HTMLButtonElement | null> = useRef(null);
    const ModalEnd: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);

    // Trap user inside the modal body
    const handleModalTrap = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (openingStatus && event.key === "Tab") {
            if (!event.shiftKey && document.activeElement === ModalEnd.current) {
                event.preventDefault();
                closeBtn.current?.focus();
            } else if (event.shiftKey && document.activeElement === closeBtn.current) {
                event.preventDefault();
                ModalEnd.current?.focus();
            }
        }
    }

    useEffect(() => {
        // Check if a click is made outside of the modal body and close it
        const handleClickOutside = (event: MouseEvent) => {
            if (modalBody.current && !modalBody.current.contains(event.target as Node)) {
                setOpeningStatus(false);
            }
        }
        document.addEventListener("click",(event) => handleClickOutside(event));

        return () => {
            // Clean up event listener
            document.removeEventListener("click",(event) => handleClickOutside(event));
        }
    },[setOpeningStatus]);

    return (
        <div
            className="modal-container"
            aria-hidden={!openingStatus}
            role="dialog"
            onKeyDown={(event) => event.key === "Escape" && setOpeningStatus(false)}
        >
            <div className="modal-container__body"
                ref={modalBody}
                onKeyDown={(event) => handleModalTrap(event)}
            >
                <button
                    aria-label="Close the modal"
                    ref={closeBtn}
                    onClick={() => setOpeningStatus(false)}
                >
                    <FaXmark />
                </button>

                {displayedComponent}

                <span ref={ModalEnd} tabIndex={0} aria-label="Tip: this modal can be closed with Escape key"></span>
            </div>
        </div>
    );
}

export default ModalMainContainer;
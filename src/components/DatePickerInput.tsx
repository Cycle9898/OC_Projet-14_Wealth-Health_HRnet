import { useEffect,useRef,useState } from "react";

type Props = {
    chosenDate: string,
    setChosenDate: React.Dispatch<React.SetStateAction<string>>,
    labelText: string,
}

/**
 * @description
 * React component that render a date picker with a integrated label and input field
 * 
 * @param chosenDate - State variable (for exemple from the parent component's local state)
 * that will contain the chosen date as a date string.
 * @param setChosenDate - setState method (for exemple from the parent component's local state) to update chosenDate.
 * @param labelText - Inner text of the label tag. It will appear above the input tag.
 * 
 * @returns JSX Element
 */
function DatePickerInput({ chosenDate,setChosenDate,labelText }: Props) {
    // Handle calendar opening
    const [isOpen,setIsOpen] = useState<boolean>(false);

    const toggleIsOpen = () => setIsOpen((previousState: boolean) => !previousState);

    // Calendar (state) variables
    const today: Date = new Date();
    const months: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const [chosenMonth,setChosenMonth] = useState<string>(months[today.getMonth()]);
    const yearsRange: string[] = Array.from({ length: 101 },(_,index) => (1950 + index).toString());
    const [chosenYear,setChosenYear] = useState<string>(today.getFullYear().toString());

    // Ref
    const datePickerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        // Check if a click is made outside of the dropdown list and close it
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click",(event) => handleClickOutside(event));

        return () => {
            // Clean up event listener
            document.removeEventListener("click",(event) => handleClickOutside(event));
        }
    },[]);

    return (
        <div className="date-picker employee-form__data-fields" ref={datePickerRef}>
            <label>{labelText}
                <input type="text"
                    value={chosenDate}
                    placeholder="MM/DD/YYYY"
                    onChange={(event) => setChosenDate(event.target.value)}
                    onClick={toggleIsOpen}
                    onKeyUp={(event) => [" ","Enter"].includes(event.key) && toggleIsOpen()}
                />
            </label>

            {isOpen && (
                <div className="date-picker__calendar">
                    <div className="calendar__header">header</div>

                    <div className="calendar__body">calendar</div>
                </div>
            )}
        </div>
    );
}

export default DatePickerInput;
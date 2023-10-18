import { useEffect,useRef,useState } from "react";
import { monthsOptions,yearsOptions } from "../utils/data/datePickerDropdownData";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { FaCaretLeft,FaCaretRight } from "react-icons/fa6";

type Props = {
    chosenDate: string,
    setChosenDate: React.Dispatch<React.SetStateAction<string>>,
    labelText: string,
}

/**
 * @description
 * React component that render a date picker with a integrated label, input field and calendar
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
    const monthOnly: string[] = monthsOptions.map((option) => option.value);
    const [chosenMonth,setChosenMonth] = useState<string>(monthOnly[today.getMonth()]);
    const [chosenYear,setChosenYear] = useState<string>(today.getFullYear().toString());
    const nbOfDaysInChosenMonth: number = 32 - new Date(parseInt(chosenYear),monthOnly.indexOf(chosenMonth),32).getDate();
    const daysRange: string[] = Array.from({ length: nbOfDaysInChosenMonth },(_,index) => String(index + 1).padStart(2,"0"));
    const startingDay = new Date(parseInt(chosenYear),monthOnly.indexOf(chosenMonth)).getDay();
    // Unshift daysRange array elements from "x" indexes according to startingDay value
    daysRange.unshift(...Array.from({ length: startingDay },() => ""));

    // Calendar functions
    const changeToNextMonth = () => {
        if (chosenMonth === "December") {
            setChosenMonth("January");
            setChosenYear((prevState) => (parseInt(prevState) + 1).toString());
        } else {
            setChosenMonth(monthOnly[monthOnly.indexOf(chosenMonth) + 1]);
        }
    };

    const changeToPreviousMonth = () => {
        if (chosenMonth === "January") {
            setChosenMonth("December");
            setChosenYear((prevState) => (parseInt(prevState) - 1).toString());
        } else {
            setChosenMonth(monthOnly[monthOnly.indexOf(chosenMonth) - 1]);
        }
    };

    const isCurrentDayToday = (day: string) => (parseInt(day) === today.getDate()) &&
        (monthOnly.indexOf(chosenMonth) === today.getMonth()) &&
        (parseInt(chosenYear) === today.getFullYear());

    const defineChosenDate = (chosenDay: string) => {
        setChosenDate(`${String((monthOnly.indexOf(chosenMonth)) + 1).padStart(2,"0")}/${chosenDay}/${chosenYear}`);
        setIsOpen(false);
    }

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
                    <div className="calendar__header">
                        <FaCaretLeft className="calendar__header__controls"
                            tabIndex={0}
                            onClick={changeToPreviousMonth}
                            onKeyDown={(event: KeyboardEvent) => [" ","Enter"].includes(event.key) && changeToPreviousMonth()}
                        />

                        <Dropdown
                            displayedValue={chosenMonth}
                            setDisplayedValue={setChosenMonth}
                            optionArray={monthsOptions}
                        />

                        <Dropdown
                            displayedValue={chosenYear}
                            setDisplayedValue={setChosenYear}
                            optionArray={yearsOptions}
                        />

                        <FaCaretRight className="calendar__header__controls"
                            tabIndex={0}
                            onClick={changeToNextMonth}
                            onKeyDown={(event: KeyboardEvent) => [" ","Enter"].includes(event.key) && changeToNextMonth()}
                        />
                    </div>

                    <div className="calendar__body">
                        <div className="calendar__body__title">
                            <span>Sun</span>
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                        </div>

                        <ul className="calendar__body__days">
                            {daysRange.map((day,index) => <li key={index}
                                className={isCurrentDayToday(day) ? "today" : day === "" ? "hidden" : undefined}
                                tabIndex={0}
                                onClick={() => defineChosenDate(day)}
                                onKeyDown={(event) => [" ","Enter"].includes(event.key) && defineChosenDate(day)}
                            >
                                {day}
                            </li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DatePickerInput;
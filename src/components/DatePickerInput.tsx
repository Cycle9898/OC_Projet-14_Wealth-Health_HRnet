import { useEffect,useId,useRef,useState } from "react";
import { monthsOnly,monthsOptions,yearsOptions } from "../utils/data/datePickerDropdownData";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { FaCaretLeft,FaCaretRight } from "react-icons/fa6";
import { checkDateString } from "../utils/inputValidationFunctions";

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

    // ID's
    const labelId = useId();
    const inputId = useId();

    // Calendar (state) variables
    const today: Date = new Date();
    const [chosenMonth,setChosenMonth] = useState<string>(monthsOnly[today.getMonth()]);
    const [chosenYear,setChosenYear] = useState<string>(today.getFullYear().toString());
    const nbOfDaysInPreviousMonth: number = 32 - new Date(parseInt(chosenYear),(monthsOnly.indexOf(chosenMonth) - 1),32).getDate();
    const nbOfDaysInChosenMonth: number = 32 - new Date(parseInt(chosenYear),monthsOnly.indexOf(chosenMonth),32).getDate();
    const daysRange: string[] = Array.from({ length: nbOfDaysInChosenMonth },(_,index) => String(index + 1).padStart(2,"0"));
    const startingDay = new Date(parseInt(chosenYear),monthsOnly.indexOf(chosenMonth)).getDay();

    // Add days from previous and next months to daysRange
    const previousMonthDays = Array.from({ length: startingDay },(_,index) => String(nbOfDaysInPreviousMonth - index).padStart(2,"0")).reverse()
    daysRange.unshift(...previousMonthDays);

    const nextMonthDays = Array.from({ length: ((startingDay > 4 ? 42 : 35) - nbOfDaysInChosenMonth - startingDay) },
        (_,index) => String(index + 1).padStart(2,"0"))
    daysRange.push(...nextMonthDays);

    // Check to exclude nextMonthDays and previousMonthDays days from actual month
    const isIndexExcluded = (index: number) => {
        if (index < previousMonthDays.length) { return true; }

        if (index >= (daysRange.length - nextMonthDays.length)) { return true; }

        return false;
    }
    // Calendar functions
    const changeToNextMonth = () => {
        if (chosenMonth === "December") {
            setChosenMonth("January");
            setChosenYear((prevState) => (parseInt(prevState) + 1).toString());
        } else {
            setChosenMonth(monthsOnly[monthsOnly.indexOf(chosenMonth) + 1]);
        }
    };

    const changeToPreviousMonth = () => {
        if (chosenMonth === "January") {
            setChosenMonth("December");
            setChosenYear((prevState) => (parseInt(prevState) - 1).toString());
        } else {
            setChosenMonth(monthsOnly[monthsOnly.indexOf(chosenMonth) - 1]);
        }
    };

    const isCurrentDayToday = (day: string) => (parseInt(day) === today.getDate()) &&
        (monthsOnly.indexOf(chosenMonth) === today.getMonth()) &&
        (parseInt(chosenYear) === today.getFullYear());

    const defineChosenDate = (chosenDay: string) => {
        setChosenDate(`${String((monthsOnly.indexOf(chosenMonth)) + 1).padStart(2,"0")}/${chosenDay}/${chosenYear}`);
        setIsOpen(false);
    }

    const preventDefaultActions = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if ([" ","Home","End","ArrowLeft","ArrowRight"].includes(event.key)) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const closeWithEscape = (event: React.KeyboardEvent) => event.key === "Escape" && setIsOpen(false);

    const handleKeyboardControls = (event: React.KeyboardEvent<HTMLDivElement>) => {
        isOpen && preventDefaultActions(event);

        event.key === "Home" && defineChosenDate("01");
        event.key === "End" && defineChosenDate(`${nbOfDaysInChosenMonth}`);
        event.key === "ArrowLeft" && changeToPreviousMonth();
        event.key === "ArrowRight" && changeToNextMonth();

        // Trap user inside the date picker
        if (event.key === "Tab") {
            if (!event.shiftKey && document.activeElement === liElementRef.current[(previousMonthDays.length - 1) + nbOfDaysInChosenMonth]) {
                event.preventDefault();
                dateInputRef.current?.focus();
            } else if (event.shiftKey && document.activeElement === dateInputRef.current) {
                event.preventDefault();
                liElementRef.current[(previousMonthDays.length - 1) + nbOfDaysInChosenMonth]?.focus();
            }
        }
    }

    // Ref
    const datePickerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const dateInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const liElementRef: React.MutableRefObject<HTMLLIElement[]> = useRef([]);

    // Input error handling
    const [errorMessage,setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Check input date validity
        chosenDate !== "" && setErrorMessage(checkDateString(chosenDate));

        // When date picker is open, focus automatically on the selected day (if any)
        if (isOpen && chosenDate.split("/").length === 3) {
            const selectedDay: string = chosenDate.split("/")[1]
            const currentLiElement = liElementRef.current.find(element => element?.innerText === selectedDay);
            currentLiElement?.focus();
        }

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
    },[isOpen,chosenDate]);

    return (
        <div className="date-picker employee-form__data-fields"
            ref={datePickerRef}
            onKeyDown={(event) => isOpen && handleKeyboardControls(event)}
        >
            <label id={labelId} htmlFor={inputId}>{labelText}</label>

            <input id={inputId}
                type="text"
                value={chosenDate}
                placeholder="MM/DD/YYYY"
                ref={dateInputRef}
                role="combobox"
                aria-labelledby={labelId}
                aria-description="MM/DD/YYYY"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                onChange={(event) => setChosenDate(event.target.value)}
                onClick={toggleIsOpen}
                onKeyUp={(event) => event.key === "Enter" && toggleIsOpen()}
                onKeyDown={(event) => closeWithEscape(event)}
            />

            {errorMessage && <p className="input-error">{errorMessage}</p>}

            {isOpen && (
                <div className="date-picker__calendar"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Use the date picker to choose a date"
                >
                    <div className="calendar__header">
                        <FaCaretLeft className="calendar__header__controls"
                            tabIndex={0}
                            role="button"
                            aria-label="Previous month"
                            onClick={changeToPreviousMonth}
                            onKeyDown={(event: KeyboardEvent) => [" ","Enter"].includes(event.key) && changeToPreviousMonth()}
                            onKeyUp={(event: React.KeyboardEvent) => closeWithEscape(event)}
                        />

                        <Dropdown
                            displayedValue={chosenMonth}
                            setDisplayedValue={setChosenMonth}
                            optionArray={monthsOptions}
                            aria-label="Choose the month in the dropdown list"
                        />

                        <Dropdown
                            displayedValue={chosenYear}
                            setDisplayedValue={setChosenYear}
                            optionArray={yearsOptions}
                            aria-label="Choose the year in the dropdown list"
                        />

                        <FaCaretRight className="calendar__header__controls"
                            tabIndex={0}
                            role="button"
                            aria-label="Next month"
                            onClick={changeToNextMonth}
                            onKeyDown={(event: KeyboardEvent) => [" ","Enter"].includes(event.key) && changeToNextMonth()}
                            onKeyUp={(event: React.KeyboardEvent) => closeWithEscape(event)}
                        />
                    </div>

                    <div className="calendar__body"
                        role="grid"
                        aria-label="Choose a date"
                    >
                        <div className="calendar__body__title">
                            <span role="gridcell">Sun</span>
                            <span role="gridcell">Mon</span>
                            <span role="gridcell">Tue</span>
                            <span role="gridcell">Wed</span>
                            <span role="gridcell">Thu</span>
                            <span role="gridcell">Fri</span>
                            <span role="gridcell">Sat</span>
                        </div>

                        <ul className="calendar__body__days">
                            {daysRange.map((day,index) => <li key={index}
                                className={isIndexExcluded(index) ? "excluded" : isCurrentDayToday(day) ? "today" : undefined}
                                tabIndex={isIndexExcluded(index) ? -1 : 0}
                                aria-label={isIndexExcluded(index) ? undefined : "Validate this day"}
                                role={isIndexExcluded(index) ? undefined : "gridcell"}
                                ref={(liElement: HTMLLIElement) => (liElementRef.current[index] = liElement)}
                                onClick={() => defineChosenDate(day)}
                                onKeyDown={(event) => [" ","Enter"].includes(event.key) && defineChosenDate(day)}
                                onKeyUp={(event) => closeWithEscape(event)}
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
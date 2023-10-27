import { useContext,useId,useState } from "react";
import { EmployeesContext } from "../utils/context/EmployeesContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { showEntriesOptions } from "../utils/data/EmployeesTableDropdownData";

/**
 * @description
 * React component that render the page to display employees list with their data
 * 
 * @remarks
 * This page is not accessible without being logged in.
 * 
 * @returns JSX element
 */
function EmployeesListPage() {
    // Get connect, auth error and auth loading statuses from React Context
    const { employeesDataArray,isEmployeesError,isEmployeesLoading } = useContext(EmployeesContext);

    // Employees table State variables
    const [showEntries,setShowEntries] = useState<string>("");
    const [searchTerm,setSearchTerm] = useState<string>("");

    // ID's
    const showEntriesNbLabelId = useId();
    const searchLabelId = useId();
    const searchInputId = useId();

    if (isEmployeesError) {
        return (
            <main className="main">
                <p className="error-msg">Due to a network error, this page could not be loaded.</p>
                <p className="error-msg">Please try again later.</p>
            </main>
        );
    }

    return (
        <>
            {isEmployeesLoading ? (
                <LoadingSpinner />
            ) : (
                <main className="main employees-list-page">
                    <h2>Current employees list</h2>

                    <section>
                        <div className="filter">
                            <div className="filter__nb-entries">
                                <span className="sr-only" id={showEntriesNbLabelId}>
                                    In the dropdown list, choose the maximum number of entries displayed in the table
                                </span>

                                <span >Show</span>
                                <Dropdown
                                    displayedValue={showEntries}
                                    setDisplayedValue={setShowEntries}
                                    optionArray={showEntriesOptions}
                                    ariaLabelById={showEntriesNbLabelId}
                                />
                                <span>entries</span>
                            </div>

                            <div className="filter__search">
                                <label htmlFor={searchInputId} id={searchLabelId}>Search:</label>

                                <input id={searchInputId}
                                    type="text"
                                    aria-labelledby={searchLabelId}
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                        </div>

                        <table className="employees-table">
                            <thead className="employees-table__header">
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Start Date</th>
                                    <th>Department</th>
                                    <th>Date of Birth</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip Code</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody className="employees-table__body">
                                {employeesDataArray.length === 0 ? (
                                    <tr>
                                        <td colSpan={10}>No data available in table</td>
                                    </tr>
                                ) : (
                                    <>
                                        {null /* TBC */}
                                    </>
                                )}
                            </tbody>
                        </table>

                        <div className="paging">
                            <div className="paging__detail-entries">
                                <span style={{ color: "red" }}>Showing {"TBC"/* first el */} to {"TBC"/* last el */} of {"TBC"/* total el */} entries</span>
                            </div>

                            <div className="paging__pagination">
                                <button
                                    className="paging__pagination__prev main-button"
                                >
                                    Previous
                                </button>

                                <div className="paging__pagination__pages">
                                    {/* TBC ... pages numbers */}
                                    <button style={{ color: "red" }}>1</button>
                                </div>

                                <button
                                    className="paging__pagination__next main-button"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            )}
        </>
    );
}

export default EmployeesListPage;
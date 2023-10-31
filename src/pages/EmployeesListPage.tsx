import { useContext,useId,useState } from "react";
import { EmployeesContext } from "../utils/context/EmployeesContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dropdown } from "@cycle9898/react-custom-dropdown-component";
import { showEntriesOptions } from "../utils/data/EmployeesTableDropdownData";
import { useGetEmployeesData } from "../utils/hooks/EmployeeFetchService";
import { statesOptions } from "../utils/data/formDropdownData";
import { ImBin } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import useEmployeesTableSearchSortPaging from "../utils/hooks/EmployeesTableServices";

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
    // Get employeesDataArray, employees error and employees loading statuses from EmployeesContext
    const { employeesDataArray,isEmployeesError,isEmployeesLoading } = useContext(EmployeesContext);

    // Employees table State variables
    const [showEntries,setShowEntries] = useState<string>("");
    const [searchTerm,setSearchTerm] = useState<string>("");

    const { filteredEmployeesDataArray } = useEmployeesTableSearchSortPaging(searchTerm);
    // ID's
    const showEntriesNbLabelId = useId();
    const searchLabelId = useId();
    const searchInputId = useId();

    // Fetch employees data with custom Hook
    useGetEmployeesData();

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
                                    <th className="not-sorted">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="employees-table__body">
                                {filteredEmployeesDataArray.length === 0 ? (
                                    <tr>
                                        <td colSpan={10}>No data available in table</td>
                                    </tr>
                                ) : (
                                    <>
                                        {filteredEmployeesDataArray.map((employeeData) => (
                                            <tr key={employeeData.id}>
                                                <td>{employeeData.firstName}</td>
                                                <td>{employeeData.lastName}</td>
                                                <td>{employeeData.startDate}</td>
                                                <td>{employeeData.department}</td>
                                                <td>{employeeData.birthDate}</td>
                                                <td>{employeeData.street}</td>
                                                <td>{employeeData.city}</td>
                                                <td>{statesOptions.find((state) => state.value === employeeData.state)?.id}</td>
                                                <td>{employeeData.zipCode}</td>
                                                <td className="actions">
                                                    <button className="main-button actions-bts"
                                                        aria-label={`Edit ${employeeData.firstName} ${employeeData.lastName}`}
                                                        title={`Edit ${employeeData.firstName} ${employeeData.lastName}`}
                                                    >
                                                        <MdModeEditOutline />
                                                    </button>

                                                    <button className="main-button actions-bts"
                                                        aria-label={`Delete ${employeeData.firstName} ${employeeData.lastName}`}
                                                        title={`Delete ${employeeData.firstName} ${employeeData.lastName}`}
                                                    >
                                                        <ImBin />
                                                    </button>
                                                </td>
                                            </tr>))}
                                    </>
                                )}
                            </tbody>
                        </table>

                        <div className="paging">
                            <div className="paging__detail-entries">
                                <span style={{ color: "red" }}>
                                    Showing {"TBC"/* first el */} to {"TBC"/* last el */} of {filteredEmployeesDataArray.length} entries
                                    {searchTerm.length >= 2 ? ` (filtered from ${employeesDataArray.length} total entries)` : null}
                                </span>
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
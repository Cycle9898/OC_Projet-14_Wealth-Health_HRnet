import { useContext,useEffect,useState } from "react";
import { EmployeeDataType,EmployeesContext } from "../context/EmployeesContext";

/**
 * @description
 * A React Custom Hook that filter, sort and paginate the employeesDataArray from EmployeesContext
 * and return a new array
 * 
 * @returns A new employees data array that got filtered, sorted and paginated
 */
function useEmployeesTableSearchSortPaging(searchTerm: string) {
    // Get employees data array from EmployeesContext
    const { employeesDataArray } = useContext(EmployeesContext);

    // State variables
    const [filteredEmployeesDataArray,setFilteredEmployeesDataArray] = useState<EmployeeDataType[]>(employeesDataArray);

    useEffect(() => {
        // Search
        applySearch(employeesDataArray,searchTerm,setFilteredEmployeesDataArray);

    },[employeesDataArray,searchTerm]);

    return { filteredEmployeesDataArray };
}

export default useEmployeesTableSearchSortPaging;

function applySearch(employeesDataArray: EmployeeDataType[],searchTerm: string,setNewEmployeesDataArray: React.Dispatch<React.SetStateAction<EmployeeDataType[]>>) {
    if (searchTerm.length >= 2) {
        const formattedSearchTerm: string = searchTerm.toLowerCase().replace(/\s/g,'');

        const newArray: EmployeeDataType[] = employeesDataArray.filter((employeeData) => (
            employeeData.firstName.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.lastName.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.startDate.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.department.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.birthDate.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.street.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.city.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.state.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm) ||
            employeeData.zipCode.toLowerCase().replace(/\s/g,'').includes(formattedSearchTerm)
        ));

        setNewEmployeesDataArray(newArray);
    } else {
        setNewEmployeesDataArray(employeesDataArray);
    }
}
import { useContext,useEffect,useState } from "react";
import { EmployeeDataType,EmployeesContext } from "../context/EmployeesContext";
import { SortingDetailType } from "../../pages/EmployeesListPage";

/**
 * @description
 * A React Custom Hook that filter, sort and paginate the employeesDataArray from EmployeesContext
 * and return a new array
 * 
 * @returns A new employees data array that got filtered, sorted and paginated
 */
function useEmployeesTableSearchSortPaging(searchTerm: string,sortingDetail: SortingDetailType) {
    // Get employees data array from EmployeesContext
    const { employeesDataArray } = useContext(EmployeesContext);

    // State variables
    const [filteredEmployeesDataArray,setFilteredEmployeesDataArray] = useState<EmployeeDataType[]>([]);

    useEffect(() => {
        // Search
        const filteredArray: EmployeeDataType[] = applySearch(employeesDataArray,searchTerm);

        // Column sorting
        const sortedArray: EmployeeDataType[] = applySorting(filteredArray,sortingDetail);

        setFilteredEmployeesDataArray(sortedArray);
    },[employeesDataArray,searchTerm,sortingDetail]);

    return { filteredEmployeesDataArray };
}

export default useEmployeesTableSearchSortPaging;

function applySearch(employeesDataArray: EmployeeDataType[],searchTerm: string) {
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

        return newArray;
    } else {
        return employeesDataArray;
    }
}

function applySorting(employeesDataArray: EmployeeDataType[],sortingDetail: SortingDetailType) {
    // Utility functions
    const getKeyByValue = (value: string) => {
        // Object to map a column name to an employeeData property
        const columnObject: { [key: string]: string } = {
            firstName: "First Name",
            lastName: "Last Name",
            startDate: "Start Date",
            department: "Department",
            birthDate: "Date of Birth",
            street: "Street",
            city: "City",
            state: "State",
            zipCode: "Zip Code"
        };

        return Object.keys(columnObject).find(key => columnObject[key as keyof typeof columnObject] === value);
    };

    const stringSorting = (propertyName: string | undefined) => {
        if (propertyName === undefined) { throw "Invalid column name" }

        return (employeeA: EmployeeDataType,employeeB: EmployeeDataType) => {
            const employeeASortedProperty: string = employeeA[propertyName as keyof typeof employeeA].toLowerCase();
            const employeeBSortedProperty: string = employeeB[propertyName as keyof typeof employeeB].toLowerCase();

            if (employeeASortedProperty < employeeBSortedProperty) { return sortingDetail.sortingType === "ASC" ? -1 : 1; }

            if (employeeASortedProperty > employeeBSortedProperty) { return sortingDetail.sortingType === "ASC" ? 1 : -1; }

            return 0;
        };
    };

    const dateStringSorting = (propertyName: string | undefined) => {
        if (propertyName === undefined) { throw "Invalid column name" }

        return (employeeA: EmployeeDataType,employeeB: EmployeeDataType) => {
            const employeeASortedProperty: number = Date.parse(employeeA[propertyName as keyof typeof employeeA]);
            const employeeBSortedProperty: number = Date.parse(employeeB[propertyName as keyof typeof employeeB]);

            return sortingDetail.sortingType === "ASC" ? (
                employeeASortedProperty - employeeBSortedProperty
            ) : (
                employeeBSortedProperty - employeeASortedProperty
            );
        };
    };

    // Sort process
    let sortingFunction: (employeeA: EmployeeDataType,employeeB: EmployeeDataType) => number;

    if (["Start Date","Date of Birth"].includes(sortingDetail.columnName)) {
        sortingFunction = dateStringSorting(getKeyByValue(sortingDetail.columnName));
    } else {
        sortingFunction = stringSorting(getKeyByValue(sortingDetail.columnName));
    }

    const newArray: EmployeeDataType[] = [...employeesDataArray].sort(sortingFunction);

    return newArray;
}
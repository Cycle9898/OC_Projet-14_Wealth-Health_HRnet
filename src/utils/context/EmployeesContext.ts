import { createContext } from "react";

export type EmployeeDataType = {
    _id: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    startDate: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    department: string
}

type EmployeesContextType = {
    employeesDataArray: EmployeeDataType[],
    handleEmployeesArray: (employeesDataArray: EmployeeDataType[]) => void,
    isEmployeesError: boolean,
    handleEmployeesErrorStatus: (errorStatus: boolean) => void,
    isEmployeesLoading: boolean,
    handleEmployeesLoadingStatus: (loadingStatus: boolean) => void
}

// Create employees Context
export const EmployeesContext = createContext<EmployeesContextType>(
    {} as EmployeesContextType
);
import { useState } from "react";
import { AuthContext,AuthErrorStatusesType } from "./AuthContext";
import { EmployeeDataType,EmployeesContext } from "./EmployeesContext";

type Props = {
    children: JSX.Element
}
/**
 * @description
 * React component that provide the global state of the app with React Context
 * 
 * @param children - the children components
 *  
 * @returns JSX element
 * 
 */
function ContextProvider({ children }: Props) {
    // Auth status
    const [isConnected,setConnected] = useState<boolean>(!!sessionStorage.getItem("HRnet_JWT"));

    const handleConnectStatus = (status: boolean) => setConnected(status);

    // Auth error statuses
    const [authErrorStatuses,setAuthErrorStatuses] = useState<AuthErrorStatusesType>({
        isAuthError: false,
        isServerError: false
    });

    const handleAuthErrors = (authErrorStatuses: AuthErrorStatusesType) => setAuthErrorStatuses(authErrorStatuses);

    // Auth loading status
    const [isAuthLoading,setAuthLoading] = useState<boolean>(false);

    const handleAuthLoadingStatus = (status: boolean) => setAuthLoading(status);

    // Employees Array
    const [employeesDataArray,setEmployeesDataArray] = useState<EmployeeDataType[]>([]);

    const handleEmployeesArray = (employeesDataArray: EmployeeDataType[]) => setEmployeesDataArray(employeesDataArray);

    // Employees error status
    const [isEmployeesError,setIsEmployeesError] = useState<boolean>(false);

    const handleEmployeesErrorStatus = (errorStatus: boolean) => setIsEmployeesError(errorStatus);

    // Employees loading status
    const [isEmployeesLoading,setIsEmployeesLoading] = useState<boolean>(false);

    const handleEmployeesLoadingStatus = (loadingStatus: boolean) => setIsEmployeesLoading(loadingStatus);

    return (
        <AuthContext.Provider value={{
            isConnected,
            handleConnectStatus,
            authErrorStatuses,
            handleAuthErrors,
            isAuthLoading,
            handleAuthLoadingStatus
        }}>
            <EmployeesContext.Provider value={{
                employeesDataArray,
                handleEmployeesArray,
                isEmployeesError,
                handleEmployeesErrorStatus,
                isEmployeesLoading,
                handleEmployeesLoadingStatus
            }}>
                {children}
            </EmployeesContext.Provider>
        </AuthContext.Provider>
    );
}

export default ContextProvider;
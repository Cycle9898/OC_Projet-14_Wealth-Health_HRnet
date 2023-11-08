import { useContext } from "react";
import { EmployeesContext } from "../context/EmployeesContext";

/**
 * @description
 * React Hook that makes an API call to delete an employee and remove him from global state
 * 
 * @returns A function that will make the delete process with the employee ID given as a parameter
 */
function useDeleteEmployee() {
    const {
        employeesDataArray,
        handleEmployeesArray,
        handleEmployeesErrorStatus,
        handleEmployeesLoadingStatus,
        isEmployeesLoading
    } = useContext(EmployeesContext);

    return async (deletedEmployeeId: string) => {
        if (!isEmployeesLoading) {
            // Set loading and error initial statuses
            handleEmployeesLoadingStatus(true);
            handleEmployeesErrorStatus(false);

            // Call API
            const apiUrl: string = (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/employees/${deletedEmployeeId}`) ||
                `http://localhost:3001/api/v1/employees/${deletedEmployeeId}`;
            const authToken: string | null = sessionStorage.getItem("HRnet_JWT");

            try {
                const response: Response = await fetch(apiUrl,{
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (response.status > 299) {
                    throw response.json();
                } else {
                    // remove deleted employee from global state
                    const newArray = employeesDataArray.filter((employeeData) => employeeData.id !== deletedEmployeeId);

                    handleEmployeesArray(newArray);
                }
            }
            catch (error: unknown) {
                handleEmployeesErrorStatus(true);
                console.log(error);
            }
            finally {
                handleEmployeesLoadingStatus(false);
            }
        }
    }
}

export default useDeleteEmployee;
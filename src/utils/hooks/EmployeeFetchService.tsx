import { useContext,useEffect } from "react";
import { EmployeesContext } from "../context/EmployeesContext";
import FormattedEmployee,{ ReceivedEmployeeData } from "../EmployeeFormatClass";

type ResponseJSONType = {
    status: number,
    message: string,
    body: ReceivedEmployeeData[]
}

/**
 * @description
 * React hook to fetch employees data from API, format data and store it in Employees React Context
 * 
 * @returns void
 */
export function useGetEmployeesData() {
    const {
        handleEmployeesArray,
        handleEmployeesErrorStatus,
        handleEmployeesLoadingStatus,
        isEmployeesLoading
    } = useContext(EmployeesContext);

    const getEmployeesData = async () => {
        if (!isEmployeesLoading) {
            // Set loading and error initial statuses
            handleEmployeesLoadingStatus(true);
            handleEmployeesErrorStatus(false);

            // Call API
            const apiUrl: string = (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/employees`) ||
                "http://localhost:3001/api/v1/employees";
            const authToken: string | null = sessionStorage.getItem("HRnet_JWT");

            try {
                const response: Response = await fetch(apiUrl,{
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (response.status === 200) {
                    const data: ResponseJSONType = await response.json();
                    // Format fetched data
                    const formattedEmployeeDataArray = data.body.map((employeeData) => new FormattedEmployee(employeeData));
                    // Store in Employees Context
                    handleEmployeesArray(formattedEmployeeDataArray);
                } else {
                    throw response.json();
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

    useEffect(() => {
        getEmployeesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
}
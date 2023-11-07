import { useState } from "react";
import type { EmployeeFormFieldsType } from "../inputValidationFunctions";

/**
 * @description
 * React hook which give tools to save employee form data
 * (AJAX request, error and loading statuses handling)
 * 
 * @returns a loading status State variable, an error status State variable
 * and a function that handle AJAX request
 */
export function useSaveEmployeeData() {
    // State variables
    const [isRequestLoading,setIsRequestLoading] = useState<boolean>(false);
    const [isRequestError,setIsRequestError] = useState<boolean>(false);

    /**
     * @description
     * Function that change error and loading statuses according to the situation and do API call to save employee data
     * 
     * @param formFieldsData - employee data that need to be saved
     * @param employeeId - Optional - ID of an employee in case an employee data are edited instead of created
     * 
     * @returns void
     */
    const saveEmployeeData = async (formFieldsData: EmployeeFormFieldsType,employeeId?: string) => {
        if (!isRequestLoading) {
            // Set loading and error initial statuses
            setIsRequestLoading(true);
            setIsRequestError(false);

            // Call the API depending on employee creation or edition
            let apiUrl: string = "";

            if (employeeId) {
                apiUrl = (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/employees/${employeeId}`) ||
                    `http://localhost:3001/api/v1/employees/${employeeId}`;
            } else {
                apiUrl = (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/employees`) ||
                    "http://localhost:3001/api/v1/employees"
            }

            const authToken: string | null = sessionStorage.getItem("HRnet_JWT");

            try {
                const response: Response = await fetch(apiUrl,{
                    method: employeeId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    },
                    body: JSON.stringify(formFieldsData)
                });

                if (response.status > 299) {
                    throw response.json();
                }
            }
            catch (error: unknown) {
                setIsRequestError(true);
                console.log(error);
            }
            finally {
                setIsRequestLoading(false);
            }
        }
    }

    return { isRequestLoading,isRequestError,saveEmployeeData };
}
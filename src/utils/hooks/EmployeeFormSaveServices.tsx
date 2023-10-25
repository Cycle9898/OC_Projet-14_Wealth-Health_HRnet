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

    const saveEmployeeData = async (formFieldsData: EmployeeFormFieldsType) => {
        if (!isRequestLoading) {
            // Set loading and error initial statuses
            setIsRequestLoading(true);
            setIsRequestError(false);

            // Call API
            const apiUrl: string = (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/employees`) ||
                "http://localhost:3001/api/v1/employees";
            const authToken: string | null = sessionStorage.getItem("HRnet_JWT");

            try {
                const response: Response = await fetch(apiUrl,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    },
                    body: JSON.stringify(formFieldsData)
                });

                if (response.status !== 201) {
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
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type OkResponseType = {
    status: number,
    message: string,
    token: string
}

/**
 * @description
 * React hooks to handle login process of a HR user
 * 
 * @remarks
 * If credentials are valid, it will change the isConnected status from Auth Context and
 * store a JWT token in the session storage of the browser
 * 
 * @returns Promise (void)
 */
export function useLoginService() {
    // Get from Auth Context functions that handle isConnected, errors and loading statuses
    const { handleConnectStatus,handleAuthErrors,handleAuthLoadingStatus } = useContext(AuthContext);

    /**
     * @remarks
     * Login process
     * 
     * @param email - email of the HR user
     * @param password - password of the HR user
     * 
     * @returns void
     */
    return async (email: string,password: string) => {
        // Initialise error and loading statues
        handleAuthErrors({
            isAuthError: false,
            isServerError: false
        });
        handleAuthLoadingStatus(true);

        // Call API
        const apiUrl: string = (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/hr/login`) ||
            "http://localhost:3001/api/v1/hr/login";

        try {

            const response: Response = await fetch(apiUrl,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email,password })
            });

            // Statues handling
            switch (response.status) {
                case 200: {
                    const data: OkResponseType = await response.json();

                    // Store JWT and change isConnected status
                    sessionStorage.setItem("HRnet_JWT",data.token);
                    handleConnectStatus(true);
                }
                    break;
                case 401:
                    handleAuthErrors({
                        isAuthError: true,
                        isServerError: false
                    });
                    break;
                default:
                    console.log(response.status);
            }
        }
        catch (error: unknown) {
            handleAuthErrors({
                isAuthError: false,
                isServerError: true
            });
            console.log(error);
        }
        finally {
            handleAuthLoadingStatus(false);
        }
    };
}

/**
 * @description
 * React hooks to handle logout process of a HR user
 * 
 * @remarks
 * It will change the isConnected status from Auth Context and
 * delete the JWT token in the session storage of the browser
 * 
 * @returns void
 */
export function useLogoutService() {
    // Get from Auth Context the function that handle isConnected status
    const { handleConnectStatus } = useContext(AuthContext);

    // React-dom hook
    const navigate = useNavigate();

    return () => {
        // Remove JWT from sessionStorage, set isConnected to false and redirect to LoginPage
        sessionStorage.removeItem("HRnet_JWT");
        handleConnectStatus(false);
        navigate("/");
    };
}
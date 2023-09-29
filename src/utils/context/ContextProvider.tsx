import { useState } from "react";
import { AuthContext,AuthErrorStatusesType } from "./AuthContext";

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

    return (
        <AuthContext.Provider value={{
            isConnected,
            handleConnectStatus,
            authErrorStatuses,
            handleAuthErrors,
            isAuthLoading,
            handleAuthLoadingStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default ContextProvider;
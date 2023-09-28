import { useState } from "react";
import { AuthContext } from "./AuthContext";

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
    // Connect status
    const [isConnected,setConnected] = useState<boolean>(!!sessionStorage.getItem("HRnet_JWT"));

    const handleConnectStatus = (status: boolean) => setConnected(status);

    return (
        <AuthContext.Provider value={{ isConnected,handleConnectStatus }}>
            {children}
        </AuthContext.Provider>
    );
}

export default ContextProvider;
import { createContext } from "react";

type AuthContextType = {
    isConnected: boolean,
    handleConnectStatus: ((status: boolean) => void)
}

// Create authentication Context
export const AuthContext = createContext<AuthContextType>({ isConnected: false,handleConnectStatus: (status: boolean) => { status } });
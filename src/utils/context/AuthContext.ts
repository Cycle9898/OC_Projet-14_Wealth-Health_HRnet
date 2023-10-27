import { createContext } from "react";

export type AuthErrorStatusesType = {
    isAuthError: boolean,
    isServerError: boolean
}

type AuthContextType = {
    isConnected: boolean,
    handleConnectStatus: (status: boolean) => void,
    authErrorStatuses: AuthErrorStatusesType,
    handleAuthErrors: (authErrorStatuses: AuthErrorStatusesType) => void,
    isAuthLoading: boolean,
    handleAuthLoadingStatus: (status: boolean) => void
}

// Create authentication Context
export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);
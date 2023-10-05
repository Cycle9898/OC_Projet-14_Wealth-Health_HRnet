import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomePage from "../pages/HomePage";
import { Navigate } from "react-router-dom";

type Props = {
    pageName: string
}

/**
 * @description
 * React component for protecting routes.
 * It will verify if the user is connected before navigate to the asked page.
 * Otherwise, the user will be redirected to an error page.
 * 
 * @param pageName - name of the asked page
 *  
 * @returns JSX element
 */
function ProtectedRoute({ pageName }: Props) {
    // Get connect status from Context
    const { isConnected } = useContext(AuthContext);

    // Get the corresponding page component from pageName
    let reactComponent: JSX.Element | undefined;

    switch (pageName) {
        case "home":
            reactComponent = <HomePage />;
            break;

        default:
            reactComponent = <HomePage />;
    }

    return (
        <>
            {isConnected ? (
                reactComponent
            ) : (
                <Navigate to="/forbidden" replace />
            )}
        </>
    );
}

export default ProtectedRoute;
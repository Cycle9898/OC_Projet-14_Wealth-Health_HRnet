import { Link } from 'react-router-dom';

type Props = {
    errorCode: string
}

/**
 * @description
 * React component that represent the Error Page of the app.
 * It can handle 401 and 404 soft error codes
 * 
 * @param errorCode - code of the soft error that need to be displayed
 * 
 * @returns JSX element
 */
function ErrorPage({ errorCode }: Props) {
    return (
        <main className="main error-page">
            <h2>{errorCode}</h2>

            {errorCode === "404" &&
                <>
                    <h3>Not Found !</h3>
                    <p>The page you are trying to reach does not exist !</p>
                </>
            }

            {errorCode === "401" &&
                <>
                    <h3>Unauthorized !</h3>
                    <p>You must be logged in to access this page !</p>
                </>
            }

            <Link className="main-button" to="/">
                {errorCode === "404" ? "Return to the home page" : "Sign in"}
            </Link>
        </main>
    );
}

export default ErrorPage;
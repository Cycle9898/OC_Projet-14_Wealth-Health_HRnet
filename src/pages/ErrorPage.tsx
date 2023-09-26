import { Link } from 'react-router-dom';

/**
 * @description
 * React component that represent the Error Page of the app
 * 
 * @returns JSX element
 */
function ErrorPage() {
    return (
        <main className="main error-page">
            <h2>404</h2>

            <h3>Not Found !</h3>

            <p>The page you are trying to reach does not exist !</p>

            <Link className="main-button" to="/">Return to the home page</Link>
        </main>
    );
}

export default ErrorPage;
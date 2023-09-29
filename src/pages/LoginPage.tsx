import { useContext,useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wealthHealthLogo from '../assets/logo/logo-solo_Wealth-Health.png';
import { AuthContext } from '../utils/context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * @description
 * React component that represent the login page of the app
 * 
 * @remarks
 * This is the entrance point of this app
 * 
 * @returns JSX element
 */
function LoginPage() {
    // Get connect, auth error and auth loading statuses from React Context
    const { isConnected,authErrorStatuses,isAuthLoading } = useContext(AuthContext);

    // React-dom hook
    const navigate = useNavigate();

    // Handle all input values and form controls with useState Hooks (local state) and some functions
    const [emailInput,setEmailInput] = useState<string>("");
    const [passwordInput,setPasswordInput] = useState<string>("");
    const [isEmailValid,setEmailValid] = useState<boolean | null>(null);
    const [isFormCompleted,setFormCompleted] = useState<boolean | null>(null);

    const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => setEmailInput(event.target.value);

    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(event.target.value);

    const handleCompletedForm = () => setFormCompleted(emailInput !== "" && passwordInput !== "");

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if form inputs aren't empty
        handleCompletedForm();

        if (isEmailValid && isFormCompleted) {
            // Try to authenticate the user with a custom Hook
        }
    }

    useEffect(() => {
        // Check if the email is valid and update isEmailValid boolean according to the case
        const checkEmailValid: boolean = /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/.test(emailInput);

        if (emailInput === "") {
            setEmailValid(null);
        } else {
            setEmailValid(checkEmailValid);
        }

        // Check if user is already connected to redirect him to the HomePage with useNavigate Hook
        if (isConnected) {
            navigate("/home",{ replace: true });
        }
    },[isConnected,navigate,emailInput]);

    if (authErrorStatuses.isServerError) {
        return (
            <main className="main">
                <p className="error-msg">Due to a network error, this page could not be loaded.</p>
                <p className="error-msg">Please try again later.</p>
            </main>
        );
    }

    return (
        <>
            {isAuthLoading ? (
                <LoadingSpinner />
            ) : (
                <main className="main login-page">
                    <section className="login-page__content-wrapper">
                        <h2>Wealth Health</h2>

                        <div>
                            <img src={wealthHealthLogo} alt="Wealth Health logo" />
                        </div>

                        <h3>HRnet</h3>

                        <form
                            className="login-form"
                            onSubmit={(event) => handleForm(event)}
                        >
                            <div className="login-form__input-wrapper">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={emailInput}
                                    onChange={(event) => handleEmailInput(event)}
                                />
                                {!isEmailValid && isEmailValid !== null &&
                                    <span className="input-error">Please enter a valid email</span>}
                            </div>

                            <div className="login-form__input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={passwordInput}
                                    onChange={(event) => handlePasswordInput(event)}
                                />
                                {isFormCompleted === false &&
                                    <span className="input-error">Your email and password must be entered</span>}
                            </div>

                            {authErrorStatuses.isAuthError &&
                                <p className="auth-error">Your email and password don't match, please verify them</p>}

                            <button className="main-button">Sign In</button>
                        </form>
                    </section>
                </main>
            )}
        </>
    );
}

export default LoginPage;
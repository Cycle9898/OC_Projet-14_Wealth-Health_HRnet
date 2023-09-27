import wealthHealthLogo from '../assets/logo/logo-solo_Wealth-Health.png';

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
    return (
        <main className="main login-page">
            <section className="login-page__content-wrapper">
                <h2>Wealth Health</h2>

                <div>
                    <img src={wealthHealthLogo} alt="Wealth Health logo" />
                </div>

                <h3>HRnet</h3>

                <form className="login-form">
                    <div className="login-form__input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />
                    </div>

                    <div className="login-form__input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>

                    <button className="main-button">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default LoginPage;
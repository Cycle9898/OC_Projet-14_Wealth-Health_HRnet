import wealthHealthLogo from "../assets/logo/logo-solo_Wealth-Health.png";

/**
 * @description
 * React component that contains a loading spinner
 * 
 * @returns JSX element
 */
function LoadingSpinner() {
    return (
        <main className="main">
            <img className="loading-spinner"
                src={wealthHealthLogo}
                alt="Wealth Health Logo"
            />
        </main>
    );
}

export default LoadingSpinner;
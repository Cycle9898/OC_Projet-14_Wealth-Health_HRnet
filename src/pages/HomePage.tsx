import { Link } from 'react-router-dom';
import wealthHealthLogo from '../assets/logo/logo-solo_Wealth-Health.png';

/**
 * @description
 * React component that represent the home page
 * 
 * @remarks
 * After a HR agent is logged, he gets redirected to this page.
 * This page is not accessible without being logged in.
 * 
 * @returns JSX element
 */
function HomePage() {
    return (
        <main className="main home-page">
            <h2>Wealth Health</h2>

            <div>
                <img src={wealthHealthLogo} alt="Wealth Health logo" />
            </div>

            <h3>HRnet</h3>

            <div className="home-page__links">
                <Link className="main-button" to="/employees-list">Employees list</Link>
                <Link className="main-button" to="/add-employee">Add an employee</Link>
            </div>
        </main>
    );
}

export default HomePage;
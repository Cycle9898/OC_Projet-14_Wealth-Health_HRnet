import { Link } from 'react-router-dom';
import wealthHealthLogo from '../assets/logo/logo-solo_Wealth-Health.png';

/**
 * @description
 * React component that represent the homepage of the app
 * 
 * @returns JSX.Element
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
                <Link to="/employee-list">Employee list</Link>
                <Link to="/add-employee">Add an employee</Link>
            </div>
        </main>
    );
}

export default HomePage;
import { useContext,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import wealthHealthLogo from '../assets/logo/logo-solo_Wealth-Health.png';
import { AuthContext } from '../utils/context/AuthContext';
import { useLogoutService } from '../utils/hooks/AuthServices';
import { FaSignOutAlt } from 'react-icons/fa'

/**
 * @description
* Header React component
* 
* @returns JSX element
*/
function Header() {
    // React-router hook to handle location
    const { pathname }: { pathname: string } = useLocation();

    // Get connect status from Context
    const { isConnected } = useContext(AuthContext);

    // Handle logout process with a custom Hook
    const handleLogout = useLogoutService();

    useEffect(() => {
        // Rename document title according to the page name (useLocation hook to determine the page name)
        let pageName: string = "";

        switch (pathname) {
            case "/":
                pageName = "Login";
                break;
            case "/home":
                pageName = "Home";
                break;
            case "/employee-list":
                pageName = "Employee list";
                break;
            case "/add-employee":
                pageName = "Add an employee";
                break;
            default:
                pageName = "Error";
        }

        document.title = `Wealth Health - ${pageName}`;
    },[pathname]);

    return (
        <header className="header">
            <div className="header__logo">
                <img src={wealthHealthLogo} alt="Wealth Health logo" />
                <h1>WEALTH HEALTH</h1>
            </div>

            <Link to="/" aria-label="Go to homepage">
                <h2>HRnet</h2>
            </Link>

            {isConnected &&
                <nav className="header__nav">
                    <Link to="/employees-list">Employees list</Link>
                    <Link to="/add-employee">Add an employee</Link>
                    <span onClick={handleLogout}
                        onKeyDown={(event) => event.key === "Enter" && handleLogout()}
                        tabIndex={0}
                        aria-label="Logout"
                    >
                        <FaSignOutAlt />
                    </span>
                </nav>
            }
        </header>
    );
}

export default Header;
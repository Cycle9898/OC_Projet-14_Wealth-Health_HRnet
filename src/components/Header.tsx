import { useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import wealthHealthLogo from '../assets/logo/logo-solo_Wealth-Health.png';

/**
 * @description
* Header React component
* 
* @returns JSX element
*/
function Header() {
    // React-router hook to handle location
    const { pathname }: { pathname: string } = useLocation();

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
            <Link to="/">
                <div className="header__logo">
                    <img src={wealthHealthLogo} alt="Wealth Health logo" />
                    <h1>WEALTH HEALTH</h1>
                </div>
            </Link>

            <nav className="header__nav">
                <Link to="/employee-list">Employee list</Link>
                <Link to="/add-employee">Add an employee</Link>
            </nav>
        </header>
    );
}

export default Header;
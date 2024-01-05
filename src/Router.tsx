import { Navigate,Outlet,RouterProvider,createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

//Layout component for SPA to add header and footer on all views
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

//Define all routes
const defineRoutes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "/home",
        element: <ProtectedRoute pageName="home" />
      },
      {
        path: "/employees-list",
        element: <ProtectedRoute pageName="employees-list" />
      },
      {
        path: "/add-employee",
        element: <ProtectedRoute pageName="add-employee" />
      },
      {
        path: "/edit-employee/:employeeId",
        element: <ProtectedRoute pageName="edit-employee" />
      },
      {
        path: "/forbidden",
        element: <ErrorPage errorCode="401" />
      },
      {
        path: "/error",
        element: <ErrorPage errorCode="404" />
      },
      {
        path: "*",
        element: <Navigate to="/error" replace />
      }
    ]
  }
],
  {
    basename: "/OC_Projet-14_Wealth-Health_HRnet"
  });

/**
 * @description
 * Router component
 * 
 * @returns JSX element
 */
function Router() {
  return (<RouterProvider router={defineRoutes} />);
}

export default Router;
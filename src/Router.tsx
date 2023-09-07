import { Navigate,Outlet,RouterProvider,createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

//Layout component for SPA to add header and footer on all pages
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
        element: <HomePage />
      },
      {
        path: "/employee-list",
        element: ""
      },
      {
        path: "/add-employee",
        element: ""
      },
      {
        path: "/error",
        element: <ErrorPage />
      },
      {
        path: "*",
        element: <Navigate to="/error" replace />
      }
    ]
  }
]);

/**
 * @description
 * Router component
 * 
 * @returns JSX.Element
 */
function Router() {
  return (<RouterProvider router={defineRoutes} />);
}

export default Router;
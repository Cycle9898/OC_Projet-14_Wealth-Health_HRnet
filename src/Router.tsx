import { Navigate,Outlet,RouterProvider,createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        element: ""
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
        element: ""
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
import { Navigate,Outlet,RouterProvider,createBrowserRouter } from "react-router-dom";

//Layout component for SPA to add header and footer on all pages
function Layout() {
  return (
    <>
      <Outlet />
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

function Router() {
  return (<RouterProvider router={defineRoutes} />);
}

export default Router;
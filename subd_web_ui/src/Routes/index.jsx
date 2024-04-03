import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";

import Main from "../Pages/Main/Main";
import SignIn from "../Pages/SignIn/SignIn";
import Admin from "../Pages/Admin/Admin";
import Table from "../Pages/Table/Table";
import Query from "../Pages/Query/Query";

const Routes = () => {
  const { isAuth } = useAuth();

  const routesForPublic = [];

  const routesForAuthenticatedOnlyUsers = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Main />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/table",
          element: <Table />,
        },
        {
          path: "/query",
          element: <Query />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <SignIn />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!isAuth ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnlyUsers,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import axios from "axios";
import { useState, useEffect } from "react";

import Main from "../Pages/Main/Main";
import SignIn from "../Pages/SignIn/SignIn";
import Admin from "../Pages/Admin/Admin";
import Table from "../Pages/Table/Table";
import Query from "../Pages/Query/Query";

const Routes = () => {
  let children1 = [];
  let routesForAuthenticatedOnlyUsers = [];
  const [data, setData] = useState("");

  const { isAuth } = useAuth();
  const { setAuth } = useAuth();

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  useEffect(() => {
    if (data !== "") {
      apiClient
        .get("auth/profile", data)
        .then((response) => {
          setData(response.data.user.role);
        })
        .catch((error) => {
          setAuth(false);
          console.log(error);
        });
    }
  }, [data]);

  children1 = [
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
  ];

  const routesForPublic = [];

  routesForAuthenticatedOnlyUsers = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: children1,
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

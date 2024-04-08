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
  let routesForAuthenticatedOnlyUsers = [];
  const [data, setData] = useState("");

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  useEffect(() => {
    apiClient
      .get("auth/profile", data)
      .then((response) => {
        setData(response.data.user.role);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const { isAuth } = useAuth();

  const routesForPublic = [];

  if (data === "admin" || data === "admin\r") {
    routesForAuthenticatedOnlyUsers = [
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
  } else {
    routesForAuthenticatedOnlyUsers = [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Main />,
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
  }

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

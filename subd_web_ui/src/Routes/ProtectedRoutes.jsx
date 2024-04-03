import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const { setAuth } = useAuth();

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  useEffect(() => {
    apiClient
      .get("auth/profile")
      .then(() => {})
      .catch((error) => {
        console.log(error);
        setAuth(false);
      });
  });

  // Проверка айнтефикации
  if (!isAuth) {
    //если не аунтефицирован вернуть на страницу аунтефикации
    return <Navigate to="" />;
  }

  //если аунтефицирован сделать доступными роуты
  return <Outlet />;
};

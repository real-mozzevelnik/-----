import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Проверка айнтефикации
  if (!token) {
    //если не аунтефицирован вернуть на страницу аунтефикации
    return <Navigate to="" />;
  }

  //если аунтефицирован сделать доступными роуты
  return <Outlet />;
};

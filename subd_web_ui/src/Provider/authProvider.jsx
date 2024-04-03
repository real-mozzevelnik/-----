/* eslint-disable react/prop-types */

//провайдер для авторизованных пользователей устанавливает токен для сессии
//получает токен после авторизации и аунтефикации с бэком
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth_] = useState(localStorage.getItem("isAuth"));

  const setAuth = (newAuth) => {
    setAuth_(newAuth);
  };

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", isAuth);
    } else {
      localStorage.removeItem("isAuth");
    }
  }, [isAuth]);

  const contextValue = useMemo(
    () => ({
      isAuth,
      setAuth,
    }),
    [isAuth]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

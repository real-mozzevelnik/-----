/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import searchIconPath from "./icon.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/authProvider";
import { NavLink } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import logo from "./Logo.png";

//форма шапки страницы, проверяет админ или просто user на странице, и открывает вкладку admin

export const SearchIcon = () => (
  <img className="header-img" src={searchIconPath} />
);

export const Header = () => {
  const [isOpen, setOpen] = useState();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  //для проверки роли пользователя
  useEffect(() => {
    apiClient
      .get("auth/profile", data)
      .then((response) => {
        setData(response.data.user.role);
      })
      .catch((error) => {
        console.log(error);
        exit();
      });
  });
  //выход с аккаунта изменение токена
  const handleLogout = () => {
    setAuth(false);
    navigate("/", { replace: false });
  };
  //выход с сервера
  const exit = () => {
    apiClient
      .post("auth/logout", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleLogout();
    return;
  };

  return (
    <>
      <header className="header">
        <NavLink to="/" className="header_logo">
          <img src={logo} className="logo-head" />
          <p className="header-p">SUBD</p>
        </NavLink>
        <nav className={`header_nav ${isOpen ? "active" : ""}`}>
          <ul className="header_nav-list">
            <NavLink to="/" className="header_nav-item">
              <li className="nav_item_li">Main</li>
            </NavLink>

            <NavLink to="/table" className="header_nav-item">
              <li className="nav_item_li">Table</li>
            </NavLink>
            <NavLink to="/query" className="header_nav-item">
              <li className="nav_item_li">SQL Query</li>
            </NavLink>
            {data === "admin" && (
              <NavLink to="/admin" className="header_nav-item">
                <li className="nav_item_li">Admin</li>
              </NavLink>
            )}
            <NavLink className="header_nav-item" onClick={exit}>
              <li className="nav_item_li">Exit</li>
            </NavLink>
          </ul>
        </nav>
        <button className="header_menu-button" onClick={() => setOpen(!isOpen)}>
          <SearchIcon />
        </button>
      </header>
    </>
  );
};

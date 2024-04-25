/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import "./AddUser.css";
import axios from "axios";

//форма добавления пользоваетля с проверкой ввода со стороны фронта
//проверка логина на уникальность

export default function Dropdown() {
  const [addMessage, setAddMessege] = useState(""); //сообщение о добавление, если логин уже есть в основном
  const [loginError, setLoginErrorMessage] = useState(""); //если логин пуст
  const [passwordError, setPasswordErrorMessage] = useState(""); //если пароль пуст
  const [roleError, setRoleErrorMessege] = useState(""); //если роль не выбрана
  const [login, setLogin] = useState(""); //логин для проверки
  const [password, setPassword] = useState(""); //пароль
  const [role, setRole] = useState(""); //роль
  const [dataAdd, setDataAdd] = useState({ login: "", password: "", role: "" }); //для отправки на сервер

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const [data, setData] = useState([{ login: "", password: "", role: "" }]);

  useEffect(() => {
    apiClient
      .get("auth/users", data)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //для проверки клика вне
  const container = useRef();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setDataAdd({ ...dataAdd, [event.target.name]: event.target.value });
    setAddMessege("");
  };

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
    setDataAdd({ ...dataAdd, [event.target.name]: event.target.value });
    setAddMessege("");
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setDataAdd({ ...dataAdd, [event.target.name]: event.target.value });
    setAddMessege("");
  };

  // состояние меню ввода
  const [dropdownState, setDropdownState] = useState({ open: false });

  //нажатие на кнопку меню
  const handleDropdownClick = () => {
    setDropdownState({ open: !dropdownState.open });
    setLoginErrorMessage("");
    setPasswordErrorMessage("");
    setRoleErrorMessege("");
    setAddMessege("");
  };

  function UniqueName(Addlogin) {
    if (data.findIndex(({ login }) => login === Addlogin) !== -1) return false;
    else return true;
  }

  const handleDropdownAddClick = () => {
    if (login === "") {
      setLoginErrorMessage("Login can't be empty");
    }
    if (password === "") {
      setPasswordErrorMessage("Password can't be empty");
    }
    if (role === "") {
      setRoleErrorMessege("Choose role for user");
    }
    if (login !== "" && password !== "" && role !== "") {
      if (UniqueName(login)) {
        apiClient
          .post("auth/addUser", dataAdd)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoginErrorMessage("");
        setPasswordErrorMessage("");
        setRoleErrorMessege("");
        setLogin("");
        setPassword("");
        setRole("");
        setDataAdd({ login: "", password: "", role: "" });
        setDropdownState({ open: false });
      } else {
        setAddMessege("This login is already occupied");
      }
    }
  };

  //нажатие вне кнопки закрывающее
  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      setDropdownState({ open: false });
    }
    setLoginErrorMessage("");
    setPasswordErrorMessage("");
    setRoleErrorMessege("");
    setAddMessege("");
  };

  //проверки нажатий  вне формы
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="drop-down" ref={container}>
      <Button
        className="drop-down-add"
        type="button"
        onClick={handleDropdownClick}
      >
        Add user
      </Button>
      {dropdownState.open && (
        <div>
          <input
            name="login"
            className="drop-down-input"
            placeholder={"Login"}
            onChange={handleChangeLogin}
          />
          <br />
          <label className="errorLabel">{loginError}</label>
          <br />
          <input
            name="password"
            className="drop-down-input"
            placeholder={"Password"}
            onChange={handleChangePassword}
          />
          <br />
          <label className="errorLabel">{passwordError}</label>
          <br />
          <form>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={handleRoleChange}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={handleRoleChange}
              />
              User
            </label>
          </form>
          <label className="errorLabel">{roleError}</label>
          <br />
          <Button
            className="drop-down-add"
            type="button"
            onClick={handleDropdownAddClick}
          >
            add
          </Button>
          <span
            className="input-add"
            style={{
              fontWeight: "bold",
              color: "Red",
            }}
          >
            {addMessage}
          </span>
        </div>
      )}
    </div>
  );
}

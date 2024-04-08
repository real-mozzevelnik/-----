/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useAuth } from "../../Provider/authProvider";
import logo from "../../assets/Logo.png";

//страница авторизации

const SignIn = () => {
  const [data, setData] = useState({ login: "", password: "" }); //отправка данных
  const [messege, setMessage] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setMessage("");
  };

  const handleLogin = () => {
    setMessage("");
    setAuth(true);
    navigate("/", { replace: true });
  };

  //проверка ввода пользователем
  const handleSubmit = (event) => {
    if (data.login === "" && data.password === "") {
      setMessage("Login and password can't be empty");
      return;
    }
    if (data.password === "") {
      setMessage("Password can't be empty");
      return;
    }
    if (data.login === "") {
      setMessage("Login can't be empty");
      return;
    }
    //отпрвка на сервер если нет пустых полей
    event.preventDefault();
    apiClient
      .post("auth/login", data)
      .then(() => {
        // setResponse(response.data);
        handleLogin();
      })
      .catch((error) => {
        setMessage("Incorrect login or password");
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="titleLogo">
        <img src={logo} className="logo" />
        <div className="title">SUBD</div>
      </div>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Sign in</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            name="login"
            placeholder="Enter your login here"
            value={data.login}
            onChange={handleChange}
            className={"inputBox"}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            name="password"
            type="password"
            placeholder="Enter your password here"
            onChange={handleChange}
            value={data.password}
            className={"inputBox"}
          />
        </div>
        <br />
        {messege !== "" && <div className="inputContainerErr">{messege}</div>}
        <br />
        <br />
        <div className={"inputContainer"}>
          <input
            className={"buttonContainer"}
            type="button"
            onClick={handleSubmit}
            value={"Log in"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

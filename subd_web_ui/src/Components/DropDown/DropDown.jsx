/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import "./DropDown.css";
import isHost from "https://cdn.skypack.dev/is-host";
import validator from "validator";
import axios from "axios";

export default function Dropdown() {
  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  //для проверки url
  // const [addMessage, setAddMessege] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Name, setName] = useState("");
  const [Host, setHost] = useState("");
  const [Port, setPort] = useState();

  const [dataAdd, setDataAdd] = useState({ name: "", host: "", port: "" }); //для отправки на сервер

  //проверка url
  const validate = (value, event) => {
    if (isHost(value)) {
      setHost(value);
      setDataAdd({ ...dataAdd, [event.target.name]: event.target.value });
    } else {
      // setErrorMessage("Is Not Valid URL");
    }
  };

  const validatePort = (value, event) => {
    if (validator.isPort(value)) {
      setPort(value);
      setDataAdd({ ...dataAdd, [event.target.name]: event.target.value });
    } else {
      // setErrorMessage("Is Not Valid URL");
    }
  };
  //для проверки клика вне
  const container = useRef();

  //изменение при вводе
  const handleChangeHost = (event) => {
    validate(event.target.value, event);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
    setDataAdd({ ...dataAdd, [event.target.name]: event.target.value });
  };
  const handleChangePort = (event) => {
    validatePort(event.target.value, event);
  };

  // состояние меню ввода
  const [dropdownState, setDropdownState] = useState({ open: false });

  //нажатие на кнопку меню
  const handleDropdownClick = () => {
    setDropdownState({ open: !dropdownState.open });
    setErrorMessage("");
    // setAddMessege("");
  };

  //при нажатии на добавление проверка ввода
  const handleDropdownAddClick = () => {
    if (!isHost(Host) && Name === "" && !validator.isPort(Port)) {
      setErrorMessage("Name, Host, Port incorrect");
      return;
    }
    if (Name === "") {
      setErrorMessage("Name can't be empty");
      return;
    }
    if (!isHost(Host)) {
      setErrorMessage("Host incorrect");
      return;
    }
    if (Port === "") {
      setErrorMessage("Port incorrect");
      return;
    }
    if (!validator.isPort(Port)) {
      setErrorMessage("Port incorrect");
      return;
    }
    if (isHost(Host) && Name !== "" && validator.isPort(Port)) {
      apiClient
        .post("/dbases/addBase", dataAdd)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      setErrorMessage("");
      setName("");
      setHost("");
      setPort("");
      setDropdownState({ open: false });
    }
  };

  //нажатие вне кнопки закрывающее
  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      setDropdownState({ open: false });
      setName("");
      setHost("");
      setPort("");
    }
    setErrorMessage("");
  };

  //проверки нажатий  вне формы
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="drop-down-db" ref={container}>
      <Button
        className="drop-down-add"
        type="button"
        onClick={handleDropdownClick}
      >
        Adding
      </Button>
      {dropdownState.open && (
        <div className="inputs">
          <input
            name="name"
            className="drop-down-input"
            placeholder={"Name of Data Base"}
            onChange={handleChangeName}
          />

          <input
            className="drop-down-input"
            name="host"
            placeholder={"Host for Data Base"}
            onChange={handleChangeHost}
          />

          <input
            className="drop-down-input"
            name="port"
            placeholder={"Port for Data Base"}
            onChange={handleChangePort}
          />
          <br />
          <span
            className="input-error"
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {errorMessage}
          </span>
          <br />
          <Button
            className="drop-down-add"
            type="button"
            onClick={handleDropdownAddClick}
          >
            Adding Data Base
          </Button>
        </div>
      )}
    </div>
  );
}

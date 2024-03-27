/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import "./DropDown.css";
import validator from "validator";

export default function Dropdown() {
  //для проверки url
  const [addMessage, setAddMessege] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Name, setName] = useState("");
  const [URL, setUrl] = useState("");

  //проверка url
  const validate = (value) => {
    if (validator.isURL(value)) {
      // setErrorMessage("Is Valid URL");
      setUrl(value);
    } else {
      // setErrorMessage("Is Not Valid URL");
    }
  };
  //для проверки клика вне
  const container = useRef();

  //изменение при вводе
  const handleChangeUrl = (event) => {
    validate(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  // состояние меню ввода
  const [dropdownState, setDropdownState] = useState({ open: false });

  //нажатие на кнопку меню
  const handleDropdownClick = () => {
    setDropdownState({ open: !dropdownState.open });
    setErrorMessage("");
    setAddMessege("");
  };

  //при нажатии на добавление проверка ввода
  const handleDropdownAddClick = () => {
    if (validator.isURL(URL) && Name !== "") {
      setAddMessege("Добавляем Базу данных");
      setErrorMessage("");
      setTimeout(() => {
        setAddMessege("");
        setErrorMessage("");
        setName("");
        setUrl("");
        setDropdownState({ open: false });
      }, 1000);
    } else {
      if (!validator.isURL(URL) && Name === "") {
        setErrorMessage("Введеное вами имя и URL не корректны");
      } else {
        if (Name === "") {
          setErrorMessage("Название не может быть пустым");
        }
        if (!validator.isURL(URL)) {
          setErrorMessage("URL не корректно");
        }
      }
    }
  };

  //нажатие вне кнопки закрывающее
  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      setDropdownState({ open: false });
    }
    setErrorMessage("");
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
        Добавление
      </Button>
      {dropdownState.open && (
        <div>
          <input
            className="drop-down-input"
            placeholder={"Название бд"}
            onChange={handleChangeName}
          />

          <input
            className="drop-down-input"
            placeholder={"URL для подклбючения бд"}
            onChange={handleChangeUrl}
          />
          <span
            className="input-error"
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {errorMessage}
          </span>
          <Button
            className="drop-down-add"
            type="button"
            onClick={handleDropdownAddClick}
          >
            Добавить БД
          </Button>
          <span
            className="input-add"
            style={{
              fontWeight: "bold",
              color: "green",
            }}
          >
            {addMessage}
          </span>
        </div>
      )}
    </div>
  );
}

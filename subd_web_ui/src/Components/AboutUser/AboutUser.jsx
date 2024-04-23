/* eslint-disable react/prop-types */
import "./AboutUser.css";
import Button from "../Button/Button";
import axios from "axios";
//дочерний элемент получает данные от выбора пользователя и выводит их
//при нажатии кнопки запрос на сервер и удаление, очистка полей после удаления

export const AboutUser = ({
  login = "",
  password = "",
  role = "",
  cleanlogin,
}) => {
  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const handleSumbit = () => {
    console.log(login);
    apiClient
      .post("auth/delete", { login: login })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    cleanlogin();
  };

  return (
    <div className="aboutUsercontainer">
      <p className="titleUsers">Information about user</p>
      <div className="containerAbout">
        <div className="information">
          <p className="text">Login : {login}</p>
          <p className="text">Password : {password}</p>
          <p className="text">Role : {role}</p>
        </div>
      </div>
      {login !== "" && (
        <div className="deleteButton">
          <div className="buttonDel">
            <Button onClick={handleSumbit}>Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
};

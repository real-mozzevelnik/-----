/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import "./TablesQ.css";
import axios from "axios";

//дочерний элемент получает данные от выбора пользователя и выводит их
//при нажатии кнопки запрос на сервер и удаление, очистка полей после удаления

let tables = [];

export default function TablesQ({ name }) {
  const container = useRef();

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const getBaseInfo = (name) => {
    if (name !== "") {
      apiClient
        .post("/dbases/getInfo", { name })
        .then((response) => {
          tables = Object.keys(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getBaseInfo(name);
  }, [tables]);

  return (
    <>
      <div className="tables" ref={container}>
        <ul>
          {tables.map((table) => (
            <li key={table}>
              <div className="table">{"Table: " + table}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

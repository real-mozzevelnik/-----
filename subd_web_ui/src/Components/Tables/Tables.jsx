/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./Tables.css";
import axios from "axios";

//дочерний элемент получает данные от выбора пользователя и выводит их
//при нажатии кнопки запрос на сервер и удаление, очистка полей после удаления

let tables = [];

export default function Tables({ name, onChange }) {
  const container = useRef();
  const [clickedId, setClickedId] = useState(-1);

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const handleChange = (info) => {
    onChange(info);
  };

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
  }, []);

  return (
    <>
      <div className="tables" ref={container}>
        <ul>
          {tables.map((table, i) => (
            <li key={table}>
              <div className="user">
                <button
                  key={i}
                  onClick={() => {
                    if (i === clickedId) {
                      handleChange({ name: "", table: "" });
                      setClickedId(-1);
                    } else {
                      if (clickedId === -1 || i !== clickedId) {
                        handleChange({ name, table });
                        setClickedId(i);
                      }
                    }
                  }}
                  className={
                    i === clickedId ? "userSelectActiveT1" : "userSelectT1"
                  }
                >
                  {"Table: " + table}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

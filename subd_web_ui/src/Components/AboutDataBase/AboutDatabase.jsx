/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import "./AboutDataBase.css";
// import Button from "../Button/Button";
import axios from "axios";
//дочерний элемент получает данные от выбора пользователя и выводит их
//при нажатии кнопки запрос на сервер и удаление, очистка полей после удаления

// const useMountEffect = (fun) => useEffect(fun, []);

export const AboutDataBase = ({
  name = "",
  host = "",
  port = "",
  count,
  countEntries,
  cleanInfo,
}) => {
  const [loading, setLoading] = useState(false);

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  useEffect(() => {
    if (name !== "") {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 2000);
    }
  }, [name]);

  const handleSumbit = () => {
    if (name !== "") {
      apiClient
        .post("dbases/delete", { name: name })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
      cleanInfo();
    }
  };

  return (
    <div className="AboutDataBasecontainer">
      <p className="titleUsers">Information about data base</p>
      <div className="containerAboutBase">
        {name !== "" ? (
          !loading ? (
            <h1 className="infoLoad">Info is loading</h1>
          ) : (
            <div className="information">
              <p className="text">Name : {name}</p>
              <p className="text">Host : {host}</p>
              <p className="text">Port : {port}</p>
              <p className="text">Count of tables: {count}</p>
              <p className="text">Count of entries: {countEntries}</p>
            </div>
          )
        ) : (
          <div className="information">
            <p className="text">Choose database for check info</p>
          </div>
        )}
      </div>
      {name !== "" && (
        <div className="deleteButton">
          <div className="buttonDel">
            <button onClick={handleSumbit}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
// const [info, setInfo1] = useState("");
// const [infoCount, setInfo] = useState("");
// const [infoCountEntries, setInfoEntries] = useState("");
// const [flag, setFlag] = useState(false);

// useEffect(() => {
//   console.log(info);
//   if (info !== "") {
//     console.log(info);
//     apiClient
//       .post("/dbases/getInfo", { info })
//       .then((response) => {
//         console.log(response.data);
//         getInfo(response.data.data);
//       })
//       .catch((error) => {
//         setInfo("");
//         setInfoEntries("");
//         console.log(error);
//       });
//   }
// });

// const Update = () => {
//   if (name !== "") {
//     apiClient
//       .post("/dbases/getInfo", { name: name })
//       .then((response) => {
//         getInfo(response.data.data);
//       })
//       .catch((error) => {
//         setInfo("");
//         setInfoEntries("");
//         console.log(error);
//       });
//   }
// };

// function getInfo(obj) {
//   var count1 = 0;
//   var countEntries1 = 0;
//   for (var prop in obj) {
//     countEntries1 += obj[prop].length;
//     if (obj.hasOwnProperty(prop)) {
//       ++count1;
//     }
//   }

//   setInfoEntries(countEntries1);
//   setInfo(count1);
// }

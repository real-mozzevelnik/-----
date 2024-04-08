/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Catalog.css";

const myComponent = {
  overflowY: "scroll",
};

export default function Catalog() {
  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const [data, setData] = useState([{ name: "", host: "", port: "" }]);
  const [baseAbout, setBase] = useState({ name: "", host: "", port: "" });

  useEffect(() => {
    let array = [{ name: "", host: "", port: "" }];

    apiClient
      .post("/dbases/getBases", array)
      .then((response) => {
        array = response.data;
        setData(array);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const [clickedId, setClickedId] = useState(-1);
  const container = useRef();

  //   const cleanAbout = () => {
  //     setUser({ login: "", password: "", role: "" });
  //   };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (e) => {
    if (
      container.current &&
      !container.current.contains(e.target) &&
      e.target.className !== "button" &&
      e.target.className !== ""
    ) {
      setClickedId(-1);
    }
  };

  return (
    <>
      <div className="catalog">
        <p className="titleCatalog">List of DataBase</p>
        <div className="listDb" ref={container} style={myComponent}>
          <ul className="usersList">
            {data.map((base, i) => (
              <li key={base.name}>
                <div className="user">
                  <button
                    key={i}
                    onClick={() => {
                      if (i === clickedId) {
                        setClickedId(-1);
                        setBase({ name: "", host: "", port: "" });
                      } else {
                        if (clickedId === -1 || i !== clickedId) {
                          setClickedId(i);
                          setBase();
                        }
                      }
                    }}
                    className={
                      i === clickedId ? "userSelectActive" : "userSelect"
                    }
                  >
                    {"DataBase: " + base.name}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

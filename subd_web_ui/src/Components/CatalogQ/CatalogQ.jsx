/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CatalogQ.css";
import TablesQ from "../TablesQ/TablesQ";
import { QueruComponent } from "../QueryComponent/QueryComponent";

const useMountEffect = (fun) => useEffect(fun);

const myComponent = {
  overflowY: "scroll",
};

export default function TCatalog() {
  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const [dropdownState, setDropdownState] = useState({ open: false });

  const handleDropdownClick = () => {
    setDropdownState({ open: !dropdownState.open });
  };

  const [name, setName] = useState("");

  const [info, setInfo] = useState({ name: "", table: "" });

  const [data, setData] = useState([{ name: "", host: "", port: "" }]);

  const getBases = () => {
    apiClient
      .post("/dbases/getBases")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [clickedId, setClickedId] = useState(-1);
  const container = useRef();

  useMountEffect(getBases);
  return (
    <>
      <div className="catalogQ">
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
                        handleDropdownClick();
                        setClickedId(-1);
                        setName("");
                        setInfo({ name: "", table: "" });
                      } else {
                        if (clickedId === -1 || i !== clickedId) {
                          if (clickedId !== i) {
                            setDropdownState({ open: true });
                            setClickedId(i);
                          } else {
                            setClickedId(i);
                            handleDropdownClick();
                          }
                          setName(base.name);
                        }
                      }
                    }}
                    className={
                      i === clickedId ? "userSelectActiveT" : "userSelectT"
                    }
                  >
                    {"DataBase: " + base.name}
                  </button>
                  {}

                  {dropdownState.open && i === clickedId && (
                    <TablesQ name={base.name} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="query">
        <QueruComponent name={name} />
      </div>
    </>
  );
}

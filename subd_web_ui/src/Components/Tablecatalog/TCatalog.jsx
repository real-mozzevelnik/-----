/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TCatalog.css";
import Tables from "../Tables/Tables";
import PaginationTables from "../PaginationTable/PaginationTable";

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

  const handleChange = (info) => {
    setInfo(info);
  };

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
      <div className="catalogT">
        <p className="titleCatalog">List of DataBase</p>
        <div className="listDbT" ref={container} style={myComponent}>
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
                    <Tables name={base.name} onChange={handleChange} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PaginationTables name={name} table={info.table} />
    </>
  );
}

/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./QueryComponent.css";

import axios from "axios";

const myComponent = {
  overflowY: "scroll",
};

export const QueruComponent = ({ name = "" }) => {
  const [data, setData] = useState("");
  const [query, setQuery] = useState("");
  const [click, setClick] = useState(false);

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const handleSumbit = () => {
    if (name !== "") {
      setClick(true);
      apiClient
        .post("dbases/getQuery", { name: name, query: query })
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {
            console.log(response.data.data);
            setData(JSON.stringify(response.data.data));
          } else {
            setData(JSON.stringify(response.data.error));
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  };

  useEffect(() => {
    setQuery("");
    setClick(false);
  }, [name]);

  useEffect(() => {
    setClick(false);
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="QueryComponent">
        <p className="titleUsers">SQL query for data base</p>
        <div className="containerQuery">
          {name !== "" ? (
            <div className="information">
              <textarea
                className="inputSQL"
                value={query}
                placeholder="Input your SQL query there end click on button send"
                onChange={handleChange}
              ></textarea>
            </div>
          ) : (
            <div className="information">
              <p className="text">Choose database for do SQL query</p>
            </div>
          )}
        </div>
        {name !== "" && (
          <div className="deleteButton">
            <div className="buttonDel">
              <button onClick={handleSumbit}>Send</button>
            </div>
          </div>
        )}
      </div>
      <div className="QueryComponent">
        <p className="titleUsers">Database response</p>
        <div className="containerQuery1" style={myComponent}>
          {name === "" && (
            <div className="information">
              <p className="text">Choose database for do SQL query</p>
            </div>
          )}
          {name !== "" && query === "" && (
            <div className="information">
              <p className="text">
                Input SQL query for database and click send{" "}
              </p>
            </div>
          )}
          {name !== "" && !click && query !== "" && (
            <div className="information">
              <p className="text">
                Input SQL query for database and click send{" "}
              </p>
            </div>
          )}
          {click && (
            <div className="information">
              <p className="text">{data}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

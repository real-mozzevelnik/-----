/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import { useCallback, useEffect, useState } from "react";
import "./PaginationTable.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pagination from "./Paginations";

let tables = [];
let data = [];
let info = null;

const myComponent = {
  overflowY: "scroll",
};

export default function PaginationTables({ name, table }) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(8);

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const getDataFromTable = () => {
    apiClient
      .post("/dbases/getData", { name: name, table: table })
      .then((response) => {
        console.log(response);
        for (let obj in response.data.data.result)
          data.push(Object.values(response.data.data.result[obj]));
      })
      .catch((error) => {
        console.log(error);
        ``;
      });
  };

  // const totalPage = Math.ceil(data.length / entriesPerPage);
  const lastEntriesIndex = currentPage * entriesPerPage;
  const firstEntriesIndex = lastEntriesIndex - entriesPerPage;
  const currentEntries = data.slice(firstEntriesIndex, lastEntriesIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getBaseInfo = (name, table) => {
    if (name !== "") {
      apiClient
        .post("/dbases/getInfo", { name })
        .then((response) => {
          tables = Object.keys(response.data.data);
          for (let obj in tables) {
            if (tables[obj] === table) {
              info = Object.keys(response.data.data[tables[obj]].schema);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          ``;
        });
    }
  };

  useEffect(() => {
    console.log(table);
    if (name !== "" && table !== "") {
      getBaseInfo(name, table);
      getDataFromTable();
      setTimeout(() => {
        setLoading(true);
      }, 2000);
    } else {
      if (table === "" || name === "" || loading === true) {
        data = [];
        setLoading(false);
      }
    }
  }, [table]);

  return (
    <>
      <div className="catalogTable">
        <p className="titleCatalog">Table: {table}</p>
        {info !== null && info !== undefined && name !== "" ? (
          <div className="listDbTable" style={myComponent}>
            {table !== "" && name !== "" ? (
              <div className="table">
                {loading && (
                  <table>
                    <thead>
                      <tr>
                        {info.map((data) => (
                          <th key={data}>{data}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentEntries.map((dataEntries) => (
                        <tr key={dataEntries}>
                          {dataEntries.map((data) => (
                            <td key={data}>{data}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {!loading && <h1>Table is loading</h1>}
              </div>
            ) : name !== "" && table === "" ? (
              <p className="Error">Plese choose table or create</p>
            ) : (
              <p className="Error">
                Plese choose dataBase and table or create them
              </p>
            )}
          </div>
        ) : (
          <div className="listDbTable">
            <p className="Error">
              {name === ""
                ? "Plese choose dataBase and table or create them"
                : "Plese choose table or create"}
            </p>
          </div>
        )}
        {name !== "" && table !== "" && loading && (
          <div className="pag">
            <Pagination
              currentPage={currentPage}
              entriesPerPage={entriesPerPage}
              totalEntries={data.length}
              paginate={paginate}
            />

            <input
              className="countPage"
              placeholder="Input number entries for show and press Enter"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
                if (event.key === "Enter") {
                  if (event.target.value === "0") {
                    event.target.value = "";
                  } else {
                    setEntriesPerPage(event.target.value);
                    setCurrentPage(1);
                  }
                  return;
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

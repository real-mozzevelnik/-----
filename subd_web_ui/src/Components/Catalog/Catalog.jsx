/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Catalog.css";
import { AboutDataBase } from "../AboutDataBase/AboutDatabase";

let count = "";
let countEntries = "";

// const useMountEffect = (fun) => useEffect(fun);

const myComponent = {
  overflowY: "scroll",
};

export default function Catalog() {
  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const [data, setData] = useState([{ name: "", host: "", port: "" }]);
  const [baseAbout, setBase] = useState({
    name: "",
    host: "",
    port: "",
  });

  function getInfoCount(obj) {
    var count = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        ++count;
      }
    }
    if (count === 0) {
      return 0;
    }
    return count;
  }

  function getInfoCountEntries(obj) {
    {
      var countEntries = 0;
      for (var prop in obj) {
        countEntries += obj[prop].length;
      }
    }
    if (countEntries === 0) {
      return 0;
    }
    return countEntries;
  }

  useEffect(() => {
    apiClient
      .post("/dbases/getBases")
      .then((response) => {
        setData(response.data);
        localStorage.setItem("bases", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const getBaseInfo = (name) => {
    apiClient
      .post("/dbases/getInfo", { name })
      .then((response) => {
        console.log(response.data);
        count = getInfoCount(response.data.data);
        countEntries = getInfoCountEntries(response.data.data);
        localStorage.setItem("info", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [clickedId, setClickedId] = useState(-1);
  const container = useRef();

  const cleanAbout = () => {
    setBase({ name: "", host: "", port: "", count: "", countEntries: "" });
  };

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
      cleanAbout();
    }
  };
  // useMountEffect(getBases);
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
                        cleanAbout();
                        setClickedId(-1);
                      } else {
                        if (clickedId === -1 || i !== clickedId) {
                          getBaseInfo(base.name, i);

                          setClickedId(i);
                          setBase({
                            name: base.name,
                            host: base.host,
                            port: base.port,
                          });
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
      {
        <div className="another">
          <AboutDataBase
            name={baseAbout.name}
            host={baseAbout.host}
            port={baseAbout.port}
            count={count}
            countEntries={countEntries}
            cleanInfo={cleanAbout}
          />
        </div>
      }
    </>
  );
}

// useEffect(() => {
//   let array = [{ name: "", host: "", port: "" }];
//   let arrayInfo = [{ count: "", countentries: "" }];
//   arrayInfo.shift();
//   apiClient
//     .post("/dbases/getBases", array)
//     .then((response) => {
//       array = response.data;
//       setData(array);
// for (let i = 0; i < array.length; i++) {
//   const name = array[i].name;
//   apiClient
//     .post("/dbases/getInfo", { name })
//     .then((response) => {
//       const dbInf = getInfo(response.data.data);
//       arrayInfo.push({
//         count: dbInf.count,
//         countEntries: dbInf.countEntries,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
//       // setDataInfo(arrayInfo);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);

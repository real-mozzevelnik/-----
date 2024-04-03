/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./Catalog.css";

const myComponent = {
  overflowY: "scroll",
};

export default function Catalog() {
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
        <div className="listDb" ref={container} style={myComponent}></div>
      </div>
    </>
  );
}

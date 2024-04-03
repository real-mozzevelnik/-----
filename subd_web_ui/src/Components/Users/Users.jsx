/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./Users.css";
import AddUser from "../../Components/AddUser/AddUser";
import axios from "axios";
import { AboutUser } from "../AboutUser/AboutUser";

const myComponent = {
  overflowY: "scroll",
};

export default function Users() {
  const [userAbout, setUser] = useState({ login: "", password: "", role: "" });
  const [profile, SetProfile] = useState({ login: "" });
  const [clickedId, setClickedId] = useState(-1);
  const container = useRef();

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  const [data, setData] = useState([{ login: "", password: "", role: "" }]);

  useEffect(() => {
    let array = [{ login: "", password: "", role: "" }];
    apiClient
      .get("auth/profile", profile)
      .then((response) => {
        SetProfile(response.data.user.login);
      })
      .catch((error) => {
        console.log(error);
      });

    apiClient
      .get("auth/users", array)
      .then((response) => {
        array = response.data;
        array.splice(
          array.findIndex(({ login }) => login === profile),
          1
        );
        setData(array);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const cleanLogin = () => {
    setUser({ login: "", password: "", role: "" });
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
      setUser({ login: "", password: "", role: "" });
    }
  };

  return (
    <>
      <div className="users-container">
        <p className="titleUsers">Users</p>
        <div className="containerUs" ref={container}>
          <p className="titleUsers1">List of users</p>
          <div className="containerUsScroll" style={myComponent}>
            <ul className="usersList">
              {data.map((user, i) => (
                <li key={user.login}>
                  <div className="user">
                    <button
                      key={i}
                      onClick={() => {
                        if (i === clickedId) {
                          setClickedId(-1);
                          setUser({ login: "", password: "", role: "" });
                        } else {
                          if (clickedId === -1 || i !== clickedId) {
                            setClickedId(i);
                            setUser(user);
                          }
                        }
                      }}
                      className={
                        i === clickedId ? "userSelectActive" : "userSelect"
                      }
                    >
                      {"User: " + user.login}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="another">
        <AboutUser
          login={userAbout.login}
          password={userAbout.password}
          role={userAbout.role}
          cleanlogin={cleanLogin}
        />
        <AddUser />
      </div>
    </>
  );
}

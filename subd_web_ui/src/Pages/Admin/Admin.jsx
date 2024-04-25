import "./Admin.css";
import { Header } from "../../Components/Header/Header";

import Users from "../../Components/Users/Users";

export default function Admin() {
  return (
    <div className="mainPage">
      <Header />
      <div className="bases">
        <Users />
      </div>
    </div>
  );
}

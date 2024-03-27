import "./Admin.css";
import { Header } from "../../Components/Header/Header";

import Users from "../../Components/Users/Users";

export default function Admin() {
  return (
    <div className="admin">
      <Header />
      <div className="users">
        <Users />
      </div>
    </div>
  );
}

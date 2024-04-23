import "./Main.css";
import { Header } from "../../Components/Header/Header";
import Dropdown from "../../Components/DropDown/DropDown";
import Catalog from "../../Components/Catalog/Catalog";

export default function Main() {
  return (
    <div>
      <Header />
      <div className="mainPage">
        <div className="bases">
          <Catalog />
        </div>
        <Dropdown />
      </div>
    </div>
  );
}

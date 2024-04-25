import "./Query.css";
import { Header } from "../../Components/Header/Header";
import Catalog from "../../Components/CatalogQ/CatalogQ";

export default function Main() {
  return (
    <div className="mainPage">
      <Header />
      <div className="basesQ">
        <Catalog />
      </div>
    </div>
  );
}

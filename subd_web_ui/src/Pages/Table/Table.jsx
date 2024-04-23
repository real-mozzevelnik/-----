import "./Table.css";
import { Header } from "../../Components/Header/Header";
import TCatalog from "../../Components/Tablecatalog/TCatalog";
// import PaginationTables from "../../Components/PaginationTable/PaginationTable";
// import { useState } from "react";
// import { useEffect, useState } from "react";

export default function Table() {
  return (
    <>
      <Header />
      <div className="tablePage">
        <TCatalog />
      </div>
    </>
  );
}

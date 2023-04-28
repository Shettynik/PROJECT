import React from "react";
import Nav from "./Nav";
import DataAvailableForPortfolio from "./DataAvailableForPortfolio";
import DataProcured from "./DataProcured";
import DataPutForBidding from "./DataPutForBidding";
import "./Portfolio.css";

var city = "";

if (localStorage.getItem("city") === null) {
  console.log("City is not configured");
} else {
  city = localStorage.getItem("city");
}

export default function Portfolio() {
  return (
    <div>
      <Nav />
      <DataAvailableForPortfolio />
      <DataPutForBidding />
      <DataProcured />
    </div>
  );
}

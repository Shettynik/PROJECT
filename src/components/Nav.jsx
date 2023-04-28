import React from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { account_inter, balance } from "../data";

export default function Nav() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // console.log(e.target.id);
    let value = e.target.id;
    if (value === "profile-btn") {
      navigate("/portfolio");
    } else if (value === "sensors-btn") {
      navigate("/sensorfarm");
    } else if (value === "ext-sensors-btn") {
      navigate("/bidding");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Trading On Blockchain</h1>
        <div className="myinfo">
          {/* PROBLEM: AFTER REFRESH THE VALUE GOES AWAY, BUT COMES AFTER MULTIPLE REFRESH DUE TO ASYNC WAY OF JS. */}
          <span>My Address : {account_inter}</span>
          <span>My Balance : {balance} Ethers </span>
        </div>
      </div>
      <div className="nav">
        <button
          className="nav-opt btn btn-dark"
          onClick={handleClick}
          id="profile-btn"
        >
          Portfolio
        </button>
        <button
          className="nav-opt btn btn-dark"
          onClick={handleClick}
          id="sensors-btn"
        >
          Sensor Farm
        </button>
        <button
          className="nav-opt btn btn-dark"
          onClick={handleClick}
          id="ext-sensors-btn"
        >
          Bidding Space
        </button>
      </div>
    </>
  );
}

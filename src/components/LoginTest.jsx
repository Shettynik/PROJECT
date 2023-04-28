import React, { useState } from "react";
import "./LoginTest.css";
import { useNavigate } from "react-router-dom";

export default function LoginTest() {
  const [state, setState] = useState({
    host: "",
    port: "",
    city: "MUMS",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    // console.log(state)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("submit")
    const { host, port, city } = state;
    if (ValidateIPaddress(host) && validatePortNumber(port)) {
      localStorage.setItem("host", host);
      localStorage.setItem("port", port);
      localStorage.setItem("city", city);
      navigate("portfolio");
    }
  }

  function ValidateIPaddress(host) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        host
      )
    ) {
      return true;
    }
    alert("You have entered an invalid IP address!");
    return false;
  }

  function validatePortNumber(num) {
    const regexExp =
      /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi;
    if (regexExp.test(num)) {
      return true;
    } else {
      alert("You have entered an invalid port number!");
      return false;
    }
  }

  return (
    <div className="content">
      <h1>Sensor Data Authentication Using Blockchains</h1>
      <div className="mainContent">
        <form onSubmit={handleSubmit}>
          <label htmlFor="host">Host</label>
          <span> </span>
          <input
            type="text"
            name="host"
            placeholder="192.168.1.0"
            required
            autoComplete="off"
            value={state.host}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="port">Port</label>
          <span> </span>
          <input
            type="number"
            name="port"
            placeholder="3000"
            required
            autoComplete="off"
            value={state.port}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="city">Select City</label>
          <span> </span>
          <select name="city" onChange={handleChange} value={state.city}>
            <option value="MUMS">Mumbai</option>
            <option value="PUNS">Pune</option>
            <option value="SURS">Surat</option>
          </select>
          <br />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

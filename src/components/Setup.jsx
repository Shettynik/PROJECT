import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./LoginTest.css";
import { useNavigate } from "react-router-dom";
import { testFunction } from "../constant";

export default function Setup() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    host: "",
    port: "",
    localFM: "",
    globalFM: "",
    localFMPort: "",
    globalFMPort: "",
    city: "MUMS",
    noOfSensors: 1,
  });

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
    const { host, port, localFM, globalFM, localFMPort, globalFMPort, city, noOfSensors } =
      state;
    localStorage.setItem("host", host);
    localStorage.setItem("port", port);
    localStorage.setItem("localFM", localFM);
    localStorage.setItem("globalFM", globalFM);
    localStorage.setItem("localFMPort", localFMPort);
    localStorage.setItem("globalFMPort", globalFMPort);
    localStorage.setItem("city", city);
    localStorage.setItem("noOfSensors", noOfSensors);
    console.log("Added successfully to local Storage!");
   
    console.log(testFunction())
    navigate("/sensorsetup");
  }


  return (
    <>
      <div className="content">
        <h1>Set-up your Blockchain</h1>
        <div className="mainContent">
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <label htmlFor="host">Host</label>
            <span> </span>
            <input
              type="text"
              name="host"
              placeholder="192.168.1.0"
              required
              autoComplete="off"
              value={state.host}
              onChange={(e) => {handleChange(e)}}
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
              onChange={(e) => {handleChange(e)}}
            />

            <br />
            <br />




            <InputGroup className="mb-3">
              <InputGroup.Text>Farm Manager Address</InputGroup.Text>
              <Form.Control
                aria-label="Address"
                type="text"
                name="localFM"
                value={state.localFM}
                onChange={(e) => {handleChange(e)}}
                placeholder="Enter Local Address"
                autoComplete="off"
              />
              <Form.Control
                aria-label="Address"
                type="text"
                name="globalFM"
                value={state.globalFM}
                onChange={(e) => {handleChange(e)}}
                placeholder="Enter Global Address"
                autoComplete="off"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Farm Manager Port</InputGroup.Text>
              <Form.Control
                required
                aria-label="Address"
                type="number"
                name="localFMPort"
                value={state.localFMPort}
                onChange={(e) => {handleChange(e)}}
                placeholder="Enter Local Port"
                autoComplete="off"
              />
              <Form.Control
                required
                aria-label="Address"
                type="number"
                name="globalFMPort"
                value={state.globalFMPort}
                onChange={(e) => {handleChange(e)}}
                placeholder="Enter Global Port"
                autoComplete="off"
              />
            </InputGroup>

            <label htmlFor="city">Select City</label>
            <span> </span>
            <select name="city" onChange={(e) => {handleChange(e)}} value={state.city}>
              <option value="MUMS">Mumbai</option>
              <option value="PUNS">Pune</option>
              <option value="SURS">Surat</option>
            </select>
            <br />
            <br />
            <label htmlFor="city">Number of Sensors</label>
            <span> </span>
            <select
              name="noOfSensors"
              onChange={(e) => {handleChange(e)}}
              value={state.noOfSensors}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <br />
            <br />
            <Button variant="primary" type="submit">
              Proceed to next step
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
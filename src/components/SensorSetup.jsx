import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./LoginTest.css";

if (localStorage.getItem("city") === null) {
  console.log("City is not present");
} else {
  var noOfSensors = localStorage.getItem("noOfSensors");
}

var arr = [];
for (let i = 0; i < noOfSensors; i++) {
  arr.push(i);
}

export default function SensorSetup() {
  const navigate = useNavigate();
  const [state, setState] = useState({});

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let sensors = noOfSensors;
    for (let index = 0; index < sensors; index++) {
      localStorage.setItem(`SN${index}address`, state[`SN${index}address`]);
      localStorage.setItem(`SN${index}Port`, state[`SN${index}Port`]);
    }

    navigate("/getSensorDetails");
  }
  return (
    <>
      <div className="content">
        <h1>Set up your Sensors!</h1>
        <div className="mainContent">
          <form onSubmit={handleSubmit}>
            {arr.map((index) => (
              <InputGroup className="mb-3" key={index}>
                <InputGroup.Text>Sensor Node {index + 1}</InputGroup.Text>
                <Form.Control
                  required
                  aria-label="Address"
                  type="text"
                  name={`SN${index}address`}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  autoComplete="off"
                />
                <Form.Control
                  required
                  aria-label="Port"
                  type="number"
                  name={`SN${index}Port`}
                  onChange={handleChange}
                  placeholder="Enter Port"
                  autoComplete="off"
                />
              </InputGroup>
            ))}
            <Button type="submit">Proceed!</Button>
          </form>
        </div>
      </div>
    </>
  );
}

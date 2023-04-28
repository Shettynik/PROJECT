import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./LoginTest.css";
import { useNavigate } from "react-router-dom";

// const demo = require('../../backend/ethereum/SensorNode/sensorScript.js');

if (localStorage.getItem("city") === null) {
  console.log("City is not present");
} else {
  var noOfSensors = localStorage.getItem("noOfSensors");
  var city = localStorage.getItem("city");
}

let sensorsArray = [];

for (let i = 0; i < noOfSensors; i++) {
  let snadd = localStorage.getItem(`SN${i}address`);
  let snport = localStorage.getItem(`SN${i}Port`);
  let obj = { snadd, snport };
  sensorsArray.push(obj);
}



const getSensorAddress = ((num)=>{
  let SN = localStorage.getItem(`SN${num-1}address`);
  return SN;
}); 


export default function SensorStart() {
  const navigate = useNavigate();
  const handleButtonChange = (e) => {
    let sensorNumber = Number(e.target.id) + 1;
    console.log(sensorNumber);
    getSensorAddress(sensorNumber);
    // demo();
  };

  const navigateToPortfolio = (e) => {
    e.preventDefault()
    navigate("/portfolio");
  }

  return (
    <>
      <div className="content">
        <h1>
          Set-up your {noOfSensors} Sensors of {city}
        </h1>
        <div className="mainContent">
          <Card>
            <Table responsive>
              <thead>
                <tr>
                  <th>Sensor</th>
                  <th>Address</th>
                  <th>Port</th>
                  <th>Button</th>
                </tr>
              </thead>
              <tbody>
                {sensorsArray.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.snadd}</td>
                    <td>{data.snport}</td>
                    <button
                      className="btn btn-secondary mx-2 pd-2"
                      id={index}
                      style={{ color: "black" }}
                      onClick={handleButtonChange}
                    >
                      Start Sensor
                    </button>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
        <Button target="_blank" onClick={(e) => {navigateToPortfolio(e)}}>Go to portfolio</Button>
      </div>
    </>
  );
}

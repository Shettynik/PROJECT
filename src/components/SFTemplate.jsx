import React from 'react';
import "./SensorFarm.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
import mqtt from "precompiled-mqtt";

var client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", function () {
  client.subscribe("MUMS1/Data");

  console.log("Client subscribed ");
});

client.on("message", function (topic, message) {
  // message is Buffer
  //console.log(message.toString())
  if (topic === "MUMS1/Data") {
    console.log("MUMS/1 DATA");
    // document.getElementById("sensor1-data").innerHTML = message.toString();
  } else {
    console.log("MUMS/2 DATA");
    // document.getElementById("sensor2-data").innerHTML = message.toString();
  }
  //client.end()
});

*/

export default function SFTemplate(data) {
  return (
    <div  key={data.address} id="sensors">
        <div id="wrap">
        <h2> Sensor Node {data.data_id}</h2>
        <Col className="main">
            <Row className='row'>Node ID: {data.data_id}</Row>
            <Row className='row'>IP address : {data.ip_address}</Row>
            <Row className='row'>Address : {data.address}</Row>
            <Row className='row'>Real Time Data : {data.real_time_data}</Row>
            <Row className='row'>Location : {data.location}</Row>
            <Row className='row'>Category : {data.category}</Row>
          </Col>
      </div>
     </div> 







 

  );
}

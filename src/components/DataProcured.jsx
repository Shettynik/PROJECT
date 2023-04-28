import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "./Portfolio.css";
import { web3_inter, bidContract } from "../data";

export default function DataProcured() {
  const [bidData, setBidData] = useState([]);

  // Pending Tasks!
  // Display only those data which that particular FM has captured
  useEffect(() => {
    bidContract.methods
      .countData("0x6588d7462c8a44e6a025b484ceba79283ac14229")
      .call()
      .then((countn) => {
        console.log("The count of data is: ", countn);
        const bdata = [];
        for (let i = 0; i < countn; i++) {
          bidContract.methods
            .getDataDetails("0x6588d7462c8a44e6a025b484ceba79283ac14229", i)
            .call()
            .then((dataDetail) => {
              console.log("Data details for Procured:", dataDetail);
              // console.log(
              //   "ID:",
              //   web3_inter.utils
              //     .hexToAscii(dataDetail[0])
              //     .replace(/\u0000/g, "")
              // );
              // console.log("sensor", dataDetail[1]);
              // console.log("bid", dataDetail[4]);
              // console.log(
              //   "timestamp",
              //   new Date(parseInt(dataDetail[5]) * 1000).toLocaleString()
              // );
              // console.log(
              //   "location",
              //   web3_inter.utils
              //     .hexToAscii(dataDetail[3])
              //     .replace(/\u0000/g, "")
              // );
              // console.log("fm", dataDetail[6]);

              bdata.push({
                id: web3_inter.utils
                  .hexToAscii(dataDetail[0])
                  .replace(/\u0000/g, ""),
                sensor: dataDetail[1],
                location: web3_inter.utils
                  .hexToAscii(dataDetail[3])
                  .replace(/\u0000/g, ""),
                timestamp: new Date(
                  parseInt(dataDetail[5]) * 1000
                ).toLocaleString(),
                farmManager: dataDetail[6],
              });

              setBidData([...bdata]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* Data Procured*/}
      <Card>
        <Card.Header className="main" style={{ fontWeight: "bold" }}>
          Data Procured
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Data_ID</th>
                <th>Sensor</th>
                <th>Bid</th>
                <th>Data Captured</th>
                <th>Farm Manager</th>
              </tr>
            </thead>
            <tbody>
              {bidData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.sensor}</td>
                  <td>{data.location}</td>
                  <td>{data.timestamp}</td>
                  <td>{data.farmManager}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

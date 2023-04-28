import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import "./Portfolio.css";
import address from "../addresses";
import {
  web3_intra,
  web3_inter,
  farmContract,
  bidContract,
  farmContractAddress,
  bidContractAddress,
  account_intra,
  account_inter
} from "../data";

console.log("Account Intra:", account_intra);
var data_id;
var sensorAdd;
let idx=0;

export default function DataAvailableForPortfolio() {
  const [sensorData, setSensorData] = useState([]);
  const biddedDataArr = [];


  function stringToBytes32(inputString) {
    const hexString = web3_intra.utils.asciiToHex(inputString);
    const bytes32 = web3_intra.utils.padRight(hexString, 64);
    return bytes32;
  }

  const handleChange = (event) => {
    event.preventDefault()
    data_id = event.target.value;
  };
//<---------- on pressing put for bid button ---------------------------------------->
  const putForBidding =  async (e) => {
    e.preventDefault();
    console.log("Address: ", address);
    
    biddedDataArr.push(data_id);

    address.forEach((farmManager) => {
      for (let manager in farmManager) {
        if (manager.toLowerCase() === account_intra.toLowerCase()) {
          console.log("True from button \n");
          for (let sensor in farmManager[manager]) {
            sensorAdd = farmManager[manager][sensor];
            console.log("SensorAdd: ", sensorAdd);
          }
        }
      }
    });

    // Put to sell
    var putOutToSell = await farmContract.methods.putOutToSell(sensorAdd, stringToBytes32(data_id)).encodeABI();

    web3_intra.eth.sendTransaction({from:account_intra, to:farmContractAddress, data: putOutToSell, gas: 50000}, function(err,res){
      if(!err){
        console.log("Transaction ID putOutToSell : "+res);
      }
      else{
        console.log("Error putOutToSell "+err);
      }
    });
    
    // console.log("putOutToSell :", putOutToSell);

    //  This needs to be fixed!
    // const check = web3_intra.eth.personal.unlockAccount(account_intra, "1234",0);
    // console.log(check)

    farmContract.methods
      .getSensorDataInfoById(sensorAdd, stringToBytes32(data_id))
      .call()
      .then(async (dataDetail) => {
        // console.log("dataDetails from portfolio:", dataDetail);

        await bidContract.methods.addNewData(stringToBytes32(data_id), sensorAdd,dataDetail[1] , dataDetail[2], dataDetail[3], dataDetail[4]).send({
          from: account_inter,
      });
      console.log("SENT TRANSACTION");

      });

  };

  useEffect(() => {
    var sensor_addresses_arr = [];
    address.forEach((farmManager) => {
      for (let manager in farmManager) {
        if (manager === account_intra) {
          console.log("True \n");
        }

        for (let sensor in farmManager[manager]) {
          sensor_addresses_arr.push(farmManager[manager][sensor]);
          console.log(farmManager[manager][sensor]);
        }
      }
    });

    sensor_addresses_arr.map((sensorAddress) => {
      console.log("sensorAddress", sensorAddress);
      farmContract.methods
        .getSensorDataCount(sensorAddress)
        .call()
        .then((countn) => {
          console.log("The count from Data Available", countn)
          const data = [];
          for (let i = 0; i < countn; i++) {
            farmContract.methods
              .getSensorDataInfo(sensorAddress, i)
              .call()
              .then((dataDetails) => {
                // console.log("data-details", i, dataDetails);
                data.push({
                  id: web3_intra.utils
                    .hexToAscii(dataDetails[0])
                    .replace(/\u0000/g, ""),
                  value: dataDetails[1],
                  hash: dataDetails[2],
                  date: new Date(
                    parseInt(dataDetails[3]) * 1000
                  ).toLocaleString(),
                  location: web3_intra.utils
                    .hexToAscii(dataDetails[4])
                    .replace(/\u0000/g, ""),
                  isVerified: dataDetails[6],
                });

                setSensorData([...data]);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

  }, []);

  return (
    <>
      <Card>
        <Card.Header className="main" style={{ fontWeight: "bold" }}>
          Data Available for Portfolio
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Data_ID</th>
                <th>DataPoints</th>
                <th>Timestamp</th>
                <th>Hash</th>
                <th>Location</th>
                <th>Traded</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((data) => (
                data.isVerified === false ? 
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.value}</td>
                  <td>{data.date}</td>
                  <td>{data.hash}</td>
                  <td>{data.location}</td>
                  <td>{data.isVerified === true ? "Yes" : "No"}</td>
                </tr> : null
              ))}


              
            </tbody>
          </Table>
          <Card.Header>
            <div
              className="bid-section"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <InputGroup className="mb-3 mx-2">
                <InputGroup.Text id="basic-addon1">Data ID</InputGroup.Text>
                <Form.Control
                  className=" td-xs-3"
                  placeholder="Enter the Data_ID"
                  aria-label="Username"
                  id="dataPutForBid"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {handleChange(e)}}
                />
              </InputGroup>
              <Button
                className="btn btn-primary mb-3"
                variant="primary"
                onClick={(e) => {putForBidding(e)}}
              >
                Put for Bidding
              </Button>
            </div>
          </Card.Header>
        </Card.Body>
      </Card>
    </>
  );
}


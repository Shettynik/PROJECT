import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import "./Portfolio.css";
import { web3_inter, bidContract,web3_intra,bidContractAddress,account_inter } from "../data";

var data_id;

export default function DataPutForBidding() {

  const handleChange = (e) =>{
     data_id = e.target.value;
     console.log(data_id)

    }

    function stringToBytes32(inputString) {
      const hexString = web3_intra.utils.asciiToHex(inputString);
      const bytes32 = web3_intra.utils.padRight(hexString, 64);
      return bytes32;
    }

    const closeBid = (e) =>{
     e.preventDefault()
      console.log("data id" , stringToBytes32(data_id))
      var closebid = bidContract.methods.closeBid(stringToBytes32(data_id)).encodeABI();;
      console.log("close bid: ", closebid)
      console.log(data_id)
      if(data_id){
        // web3_inter.personal.unlockAccount(web3_inter.eth.accounts[0],"test");
        web3_inter.eth.sendTransaction({to:bidContractAddress, from:account_inter, data: closebid, gas: 300000 },function(err,res){
          if(!err){
              // alert("Close Bid Transaction ID is "+res);
              console.log("Close bid tx",res)
          }
          else{
              console.log("Error Closing Bid : " + err);
          }
        });
      }
      else {
        alert("Data ID cannot be Empty");
      }
        
    }
    


  const [bidData, setBidData] = useState([]);
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
              console.log("Data details for Bidding:", dataDetail);

              bdata.push({
                id: web3_inter.utils
                  .hexToAscii(dataDetail[0])
                  .replace(/\u0000/g, ""),
                location: web3_inter.utils
                  .hexToAscii(dataDetail[3])
                  .replace(/\u0000/g, ""),
                timestamp: new Date(
                  parseInt(dataDetail[5]) * 1000
                ).toLocaleString(),
                bid: dataDetail[4],
                bidder: dataDetail[7],
                bidOpen: dataDetail[8],
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
      <Card>
        <Card.Header className="main" style={{ fontWeight: "bold" }}>
          Data put up for Bidding
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Data_ID</th>
                <th>Location</th>
                <th>Bid</th>
                <th>Timestamp</th>
                <th>Bidder</th>
                <th>Bid Open</th>
              </tr>
            </thead>
            <tbody>
              {bidData.map((data) => (
                data.bidOpen === false ? 
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.location}</td>
                  <td>{data.bid}</td>
                  <td>{data.timestamp}</td>
                  <td>{data.bidder}</td>
                  <td>{data.bidOpen === true ? "Yes" : "No"}</td>
                </tr> :null 
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
                  onChange={handleChange}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button
                className="btn btn-primary mb-3"
                variant="primary"
                onClick={closeBid}
              >
                Close Bid
              </Button>
            </div>
          </Card.Header>
        </Card.Body>
      </Card>
    </>
  );
}

const Web3 = require("web3");

var httpAddrManagerLocal, sensors, host, port, city, localFM, globalFM, localFMPort, globalFMPort, noOfSensors, addrManagerLocal, AddrManagerLocal, addrManagerGlobal, httpAddrManagerGlobal;
var sensorAddrArray = [];
var sensorPortArray = [];

const testFunction = ( ) => {
    console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    if (localStorage.getItem("host") === null) {
        // alert("Host not Configured");
        console.log("HOST NOT DEFINED");
        return {}
      }
      else {
        host = localStorage.getItem('host');
        port = localStorage.getItem('port');
        city = localStorage.getItem("city");
        localFM = localStorage.getItem("localFM");
        globalFM = localStorage.getItem("globalFM");
        localFMPort = localStorage.getItem("localFMPort");
        globalFMPort = localStorage.getItem("globalFMPort");
        noOfSensors = localStorage.getItem("noOfSensors");
      
        addrManagerLocal = `http://127.0.0.1:${localFMPort}`;
        AddrManagerLocal = new Web3(new Web3.providers.HttpProvider(addrManagerLocal));
      
        addrManagerGlobal = `http://${host}:${globalFMPort}`;
        httpAddrManagerGlobal = new Web3(new Web3.providers.HttpProvider(addrManagerGlobal));
      
      //   sensors = noOfSensors;
        
        for (let index = 0; index < sensors; index++) {
          sensorAddrArray.push(localStorage.getItem(`SN${index}address`));
          sensorPortArray.push(localStorage.getItem(`SN${index}Port`))
        }
        localStorage.setItem("web3_intra", addrManagerLocal);
        return {"addrManagerLocal":addrManagerLocal}
      }
      
}

export {
    testFunction
}




// export {
//   host,
//   port,
//   city,
//   localFM,
//   globalFM,
//   localFMPort,
//   globalFMPort,
//   noOfSensors,
//   sensorAddrArray,
//   sensorPortArray,
//   httpAddrManagerLocal,
//   httpAddrManagerGlobal
// }
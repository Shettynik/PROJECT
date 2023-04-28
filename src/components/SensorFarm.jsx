import React from "react";
import Nav from "./Nav";
import "./SensorFarm.css";
import SFTemplate from "./SFTemplate";

if (localStorage.getItem("host") === null) {
  // alert("Host not Configured");
  console.log("blah");
} else {
  // var host = localStorage.getItem('host');
  // var port = localStorage.getItem('port');
  var city = localStorage.getItem("city");
  // console.log(host,port,city);
}

const datas = [
  {
    data_id: 1,
    ip_address: "192.168.0.10",
    address: "some_dummy_data",
    real_time_data: 100,
    location: "Chembur",
    category: "Pollution",
    network_id: 101,
    city: "MUMS",
  },
  {
    data_id: 2,
    ip_address: "192.168.0.12",
    address: "some_dummy_data",
    real_time_data: 200,
    location: "Ghatkopar",
    category: "Pollution",
    network_id: 101,
    city: "MUMS",
  },
  {
    data_id: 1,
    ip_address: "192.168.0.12",
    address: "some_dummy_data",
    real_time_data: 200,
    location: "Pune",
    category: "Pollution",
    network_id: 202,
    city: "PUNS",
  },
  {
    data_id: 2,
    ip_address: "192.168.0.12",
    address: "some_dummy_data",
    real_time_data: 200,
    location: "Koregaon",
    category: "Pollution",
    network_id: 202,
    city: "PUNS",
  },
  {
    data_id: 1,
    ip_address: "192.168.0.12",
    address: "some_dummy_data",
    real_time_data: 200,
    location: "Surat",
    category: "Pollution",
    network_id: 303,
    city: "SURS",
  },
];

// let ntwork_id =202;
city = localStorage.getItem("city");

export default function SensorFarm() {
  return (
    <>
      <Nav />
      {datas.map((data) => {
        return (
          <>
            {city === data.city && (
              <SFTemplate
                data_id={data.data_id}
                ip_address={data.ip_address}
                address={data.address}
                real_time_data={data.real_time_data}
                location={data.location}
                category={data.category}
              />
            )}
          </>
        );
      })}
    </>
  );
}

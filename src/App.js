import "./App.css";
import SensorFarm from "./components/SensorFarm";
import { Routes, Route } from "react-router-dom";
import LoginTest from "./components/LoginTest";
import Bidding from "./components/Bidding";
import Portfolio from "./components/Portfolio";
import Setup from "./components/Setup";
import SensorSetup from "./components/SensorSetup";
import SensorStart from "./components/SensorStart";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<LoginTest />} /> */}
        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/sensorfarm" element={<SensorFarm />} />
        <Route path="/bidding" element={<Bidding />} />
        <Route path="/" element={<Setup />} />
        <Route path="/sensorsetup" element={<SensorSetup />} />
        <Route path="/getSensorDetails" element={<SensorStart />} />
      </Routes>
    </div>
  );
}

export default App;

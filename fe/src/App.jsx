import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "@tremor/react/dist/esm/tremor.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SensorLogs from "./pages/SensorLogs/SensorLogs";
import ActionLogs from "./pages/ActionLogs/ActionLogs";
import React from "react";

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(true);
  return (
    <BrowserRouter>
      <div className="flex">
        <aside className={`duration-500 transition-all w-full max-w-[64px] ${isOpenSidebar && 'xl:max-w-[256px]'}`}>
          <Sidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        </aside>
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sensorlogs" element={<SensorLogs />} />
            <Route path="/actionlogs" element={<ActionLogs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

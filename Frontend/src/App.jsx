import { BrowserRouter, Routes, Route } from "react-router-dom";

import TrainerDashboard from "./Pages/TrainerDashBoard.jsx";
import StudentDashboard from "./Pages/StudentsDashBoard.jsx";
import Login from "./Pages/Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/trainer" element={<TrainerDashboard/>} />
        <Route path="/student" element={<StudentDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}
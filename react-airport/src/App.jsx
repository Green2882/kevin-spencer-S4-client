import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Index from "./components/Index.jsx";
import Flights from "./components/Flights.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/index" element={<Index />} />
      <Route path="/flights" element={<Flights />} />
    </Routes>
  );
}

export default App;


import { Routes, Route } from "react-router-dom";
import  Landing  from "@/pages/Landing";
import  Register  from "@/pages/Register";
import  Dashboard  from "@/pages/Dashboard";
import Inventory from "@/pages/Inventory";
import  Login  from "@/pages/Login";
import { Pricing } from "./pages/Pricing";

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Landing/>} />
      <Route path="/register"  element={<Register/>} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/dashboard"  element={<Dashboard />} />
      <Route path="/inventory"  element={<Inventory />} />
      <Route path="/pricing"  element={<Pricing />} />
    </Routes>
  ) 
}

export default App

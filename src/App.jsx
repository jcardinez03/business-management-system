
import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Register from "@/pages/Register";
import Index from "@/pages/Index";
import { Inventory } from "@/pages/business/Inventory";
import Login from "@/pages/Login";
import { Pricing } from "./pages/business/Pricing";
import { Dashboard } from "./pages/business/Dashboard";
import { Categories } from "./pages/business/Categories";
import { BusinessLayout } from "./pages/business/BusinessLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/index" element={<Index />} />
      <Route path="/business/:id" element={<BusinessLayout />}>
        <Route path="inventory" element={<Inventory />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Routes>
  )
}

export default App

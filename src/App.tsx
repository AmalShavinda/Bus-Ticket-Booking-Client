import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import AdminDashBoard from "./pages/Admin/AdminDashBoard/AdminDashBoard";
import Home from "./pages/Client/Home/Home";
import EmployeeDashBoard from "./pages/EmployeeDashBoard/EmployeeDashBoard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Protected route for admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute employeeOnly>
              <EmployeeDashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

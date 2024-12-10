import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
  employeeOnly?: boolean; // For routes accessible only by admins
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false, employeeOnly = false }) => {
  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Fallback to cookies if Redux state is not populated
  const token = Cookies.get("access_token");
  const storedUser = Cookies.get("user_details") ? JSON.parse(Cookies.get("user_details")!) : null;

  // Determine final authentication and user data
  const finalAuthenticated = isAuthenticated || !!token;
  const finalUser = user || storedUser;

  if (!finalAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && (!finalUser || !finalUser.isAdmin)) {
    window.alert("You do not have permission to access this page.");
    // Redirect to home if user is not an admin
    return <Navigate to="/" replace />;
  }

  // Check for employee-only access
  if (employeeOnly && (!finalUser || finalUser.role !== "employee")) {
    window.alert("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

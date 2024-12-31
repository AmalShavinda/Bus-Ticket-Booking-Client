import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
  employeeOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
  employeeOnly = false,
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const token = Cookies.get("access_token");
  const storedUser = Cookies.get("user_details")
    ? JSON.parse(Cookies.get("user_details")!)
    : null;

  const finalAuthenticated = isAuthenticated || !!token;
  const finalUser = user || storedUser;

  if (!finalAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && finalUser?.role !== "admin") {
    window.alert("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  if (employeeOnly && finalUser?.role !== "employee") {
    window.alert("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

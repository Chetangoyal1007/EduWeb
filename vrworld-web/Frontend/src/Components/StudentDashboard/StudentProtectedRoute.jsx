// src/ProtectedRoutes/StudentRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Allow only if logged in and role is 'user'
  if (token && role === "user") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default StudentRoute;

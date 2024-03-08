import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  if (currentUser && currentUser.role === "ADMIN") {
    return children;
  } else {
    alert("נגשת למקום לא מורשה");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;

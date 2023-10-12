import React from "react";
import { useSelector } from "react-redux";
import { selectLogginUser } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector(selectLogginUser);
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default Protected;

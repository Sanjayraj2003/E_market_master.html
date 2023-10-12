import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import {
  selectLogginUser,
  selectUserChecked,
} from "../features/auth/authSlice";
import { selectUserInfo } from "../features/user/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLogginUser);
  const userInfo = useSelector(selectUserInfo);
  const userChecked = useSelector(selectUserChecked);
  if (userChecked) {
    if (!user) {
      return <Navigate to="/login" replace={true}></Navigate>;
    }
    if (user && userInfo && userInfo.role !== "admin") {
      return <Navigate to="/" replace={true}></Navigate>;
    }
    return children;
  }
};

export default ProtectedAdmin;

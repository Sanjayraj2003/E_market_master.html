import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLogginUser, signOutAsync } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLogginUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  return <div>{!user && <Navigate to="/login" replace={true}></Navigate>}</div>;
};

export default Logout;

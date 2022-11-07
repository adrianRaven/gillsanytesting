import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";
export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.data.user.roles[0] === "ADMIN" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}

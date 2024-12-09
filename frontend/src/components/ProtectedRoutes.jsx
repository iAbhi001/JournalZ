import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";

const ProtectedRoutes = () => {


  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
};

export default ProtectedRoutes;

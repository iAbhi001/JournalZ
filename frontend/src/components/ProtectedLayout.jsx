import React from "react";
import { Box } from "@mui/material";
import SideNav from "./SideNav";

const ProtectedLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 4 }}>{children}</Box>
    </Box>
  );
};

export default ProtectedLayout;

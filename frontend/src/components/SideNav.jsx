import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateJournal = () => {
    navigate("/create-journal");
  };

  return (
    <Box
      sx={{
        width: "250px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2575fc, #6a11cb)",
        color: "#fff",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      {/* App Header */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Journaling App
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Navigate your journey
        </Typography>
      </Box>

      {/* Create Journal Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleCreateJournal}
        sx={{
          backgroundColor: "#ff758c",
          "&:hover": { backgroundColor: "#ff7eb3" },
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        Create Journal
      </Button>

      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", marginBottom: 2 }} />

      {/* Navigation List */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ color: "#fff", fontWeight: "bold" }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/public-journals")}>
            <ListItemIcon>
              <AutoStoriesIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText
              primary="All Journals"
              sx={{ color: "#fff", fontWeight: "bold" }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/my-journals")}>
            <ListItemIcon>
              <LibraryBooksIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText
              primary="My Journals"
              sx={{ color: "#fff", fontWeight: "bold" }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText
              primary="My Profile"
              sx={{ color: "#fff", fontWeight: "bold" }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", marginY: 2 }} />

      {/* Logout */}
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#ff5252" }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{ color: "#ff5252", fontWeight: "bold" }}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default SideNav;

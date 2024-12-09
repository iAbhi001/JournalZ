import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  Container,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", paddingY: 4 }}>
      {/* Banner Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)",
          color: "#fff",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          marginBottom: 6,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome, Admin!
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          Manage users, public journals, and other admin-specific features efficiently.
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card
            onClick={() => handleNavigation("/admin/manage-users")}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              backgroundColor: "#6a11cb",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: "#fff",
                  color: "#6a11cb",
                  width: 60,
                  height: 60,
                  margin: "16px auto",
                }}
              >
                <GroupIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" marginTop={2}>
                Manage Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            onClick={() => handleNavigation("/admin/manage-journals")}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              backgroundColor: "#2575fc",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: "#fff",
                  color: "#2575fc",
                  width: 60,
                  height: 60,
                  margin: "16px auto",
                }}
              >
                <AssignmentIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" marginTop={2}>
                Manage Journals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;

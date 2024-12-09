import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import API from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.post("/users/reset-password", { token, newPassword });
      setSuccessMessage(data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)",
        color: "#fff",
        padding: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 5,
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
          Enter your new password to reset it.
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleResetPassword}
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#ff758c",
            "&:hover": { backgroundColor: "#ff7eb3" },
          }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;

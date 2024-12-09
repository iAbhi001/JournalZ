import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simulate success response
    setTimeout(() => {
      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setLoading(false);
    }, 2000);
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

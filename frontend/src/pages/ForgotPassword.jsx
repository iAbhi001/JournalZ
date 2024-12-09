import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Alert } from "@mui/material";
import API from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { data } = await API.post("/users/forgot-password", { email });
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to send reset link."
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
        background: "linear-gradient(135deg, #5d9cec 0%, #4a5bdc 100%)",
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
          Forgot Password
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
          Enter your email address, and we'll send you a link to reset your password.
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          placeholder="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleForgotPassword}
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#5d9cec",
            "&:hover": { backgroundColor: "#4a5bdc" },
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        <Box sx={{ mt: 2 }}>
          <Link href="/login" underline="hover" color="secondary">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

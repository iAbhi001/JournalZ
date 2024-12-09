import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Alert } from "@mui/material";

const Login = () => {
  // Form state and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("Login functionality is disabled in this UI-only version.");
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
        padding: { xs: 2, md: 4 },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "400px", opacity: 0.9 }}>
          Start journaling your thoughts and manage your experiences with ease.
        </Typography>
      </Box>

      {/* Right Section (Form) */}
      <Box
        sx={{
          flex: 1,
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 5,
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#6a11cb",
            "&:hover": { backgroundColor: "#2575fc" },
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link href="/forgot-password" underline="hover" color="secondary">
            Forgot Password?
          </Link>
        </Box>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{" "}
            <Link href="/signup" underline="hover" color="primary">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

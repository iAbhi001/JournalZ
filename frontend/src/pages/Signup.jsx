import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import API from "../api/axios"; // Import Axios instance

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Form state and error handling
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async () => {
    setError(""); // Reset error
    setSuccess(""); // Reset success message

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await API.post("/users/register", {
        name,
        email,
        password,
        role, // Include role in the request
      });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)",
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
          Join Us Today!
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "400px", opacity: 0.9 }}>
          Create your account and start your journaling journey with us. Share,
          reflect, and grow.
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
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Name"
          placeholder="Name"
          variant="outlined"
          margin="normal"
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="Email"
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
          placeholder="Password"
          type="password"
          variant="outlined"
          margin="normal"
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          InputProps={{
            style: { background: "#f5f5f5", borderRadius: "8px" },
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ background: "#f5f5f5", borderRadius: "8px" }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#ff758c",
            "&:hover": { backgroundColor: "#ff7eb3" },
          }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Link href="/login" underline="hover" color="primary">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;

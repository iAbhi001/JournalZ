import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../api/axios"; // Axios instance
import { useNavigate, useParams } from "react-router-dom";

const AdminDetailedJournal = () => {
  const { id } = useParams(); // Journal ID from URL
  const navigate = useNavigate();

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const { data } = await API.get(`/journals/${id}`);
        setJournal(data);
      } catch (err) {
        setError("Failed to fetch journal details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      try {
        await API.delete(`/journals/${id}`);
        alert("Journal deleted successfully.");
        navigate("/admin/manage-journals");
      } catch (err) {
        alert("Failed to delete the journal.");
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 4,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          borderRadius: 3,
          color: "#fff",
          padding: 4,
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          {journal.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          {new Date(journal.createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      {/* Journal Content */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
          marginBottom: 4,
        }}
      >
        <img
          src={journal.image || "https://via.placeholder.com/800x300"}
          alt={journal.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "3px",
            marginBottom: "16px",
          }}
        />
        <Typography variant="body1" sx={{ whiteSpace: "pre-line", marginBottom: 4 }}>
          {journal.content}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Stack direction="row" spacing={1}>
          {journal.tags?.map((tag, index) => (
            <Chip key={index} label={tag} />
          ))}
        </Stack>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/manage-journals")}
        >
          Back
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete Journal
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDetailedJournal;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Divider,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";

const DetailedJournal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [journalData, setJournalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const loggedInUserId = "12345"; // Simulated logged-in user ID

  // Simulate fetching journal data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const simulatedData = {
        title: "Sample Journal Title",
        category: "Personal",
        content: "This is the sample content of the journal.",
        createdAt: new Date().toISOString(),
        visibility: "public",
        image: "https://via.placeholder.com/800x300",
        tags: ["Sample", "React", "Journal"],
        user: {
          _id: loggedInUserId,
          name: "John Doe",
          email: "john.doe@example.com",
          avatar: "https://via.placeholder.com/150",
        },
      };
      setJournalData(simulatedData);
      setIsPrivate(simulatedData.user._id === loggedInUserId);
      setLoading(false);
    }, 1000);
  }, [id, loggedInUserId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/edit-journal/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      alert("Journal deleted successfully.");
      navigate("/my-journals");
    }
  };

  const handleVisibilityToggle = () => {
    const newVisibility = journalData.visibility === "private" ? "public" : "private";
    setJournalData({ ...journalData, visibility: newVisibility });
    alert(`Journal is now ${newVisibility}.`);
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9", padding: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          borderRadius: 3,
          boxShadow: 2,
          padding: 4,
          marginBottom: 4,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {journalData.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {journalData.category} •{" "}
          {new Date(journalData.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            backgroundColor: "#2575fc",
            "&:hover": { backgroundColor: "#6a11cb" },
          }}
        >
          Back to Journals
        </Button>
        {isPrivate && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="contained"
              color={journalData.visibility === "private" ? "success" : "warning"}
              startIcon={
                journalData.visibility === "private" ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
              onClick={handleVisibilityToggle}
            >
              {journalData.visibility === "private" ? "Make Public" : "Make Private"}
            </Button>
          </Box>
        )}
      </Box>

      {/* Journal Content Section */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
          textAlign: "justify",
        }}
      >
        <img
          src={journalData.image}
          alt={journalData.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "3px",
            marginBottom: 16,
          }}
        />
        <Typography variant="body1" sx={{ marginBottom: 4, whiteSpace: "pre-line" }}>
          {journalData.content}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Stack direction="row" spacing={1}>
          {journalData.tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                backgroundColor: "#e0f7fa",
                color: "#00796b",
                fontWeight: "bold",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Author Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 4,
          backgroundColor: "#fff",
          padding: 2,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <Avatar
          sx={{ width: 60, height: 60, marginRight: 2 }}
          src={journalData.user?.avatar}
        />
        <Typography variant="body1">
          Written by <strong>{journalData.user?.name}</strong>
          <Typography variant="body2" sx={{ color: "gray", marginTop: 0.5 }}>
            {journalData.user?.email}
          </Typography>
        </Typography>
      </Box>

      {/* Comments Section */}
      <Box sx={{ marginTop: 4 }}>
        <Comments journalId={id} journalOwnerId={journalData.user?._id} currentUserId={loggedInUserId} />
      </Box>
    </Box>
  );
};

export default DetailedJournal;

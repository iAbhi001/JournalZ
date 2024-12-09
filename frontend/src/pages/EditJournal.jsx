import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios"; // Axios instance for API calls

const EditJournal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [journalData, setJournalData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
    tags: [], // Add tags field
  });

  const [tagInput, setTagInput] = useState(""); // For adding new tags
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch existing journal data
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const { data } = await API.get(`/journals/${id}`);
        setJournalData(data);
      } catch (err) {
        console.error("Error fetching journal:", err);
        setError("Failed to fetch journal data.");
      } finally {
        setFetching(false);
      }
    };
    fetchJournal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournalData({ ...journalData, [name]: value });
  };

  // Handle adding a new tag
  const handleAddTag = () => {
    if (tagInput.trim() && !journalData.tags.includes(tagInput.trim())) {
      setJournalData({ ...journalData, tags: [...journalData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setJournalData({
      ...journalData,
      tags: journalData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await API.put(`/journals/${id}`, journalData); // Make API call to update the journal
      setSuccess("Journal updated successfully!");
      setTimeout(() => navigate("/my-journals"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update journal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      {fetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Edit Journal
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {success}
            </Alert>
          )}
          <TextField
            label="Title"
            name="title"
            value={journalData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              style: { backgroundColor: "#f9f9f9", borderRadius: "8px" },
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={journalData.category}
              onChange={handleChange}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Content"
            name="content"
            value={journalData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            InputProps={{
              style: { backgroundColor: "#f9f9f9", borderRadius: "8px" },
            }}
          />
          <TextField
            label="Image URL"
            name="image"
            value={journalData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              style: { backgroundColor: "#f9f9f9", borderRadius: "8px" },
            }}
          />

          {/* Tags Section */}
          <Box sx={{ marginY: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}>
              {journalData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  sx={{
                    backgroundColor: "#6a11cb",
                    color: "#fff",
                    "& .MuiChip-deleteIcon": { color: "#fff" },
                  }}
                />
              ))}
            </Box>
            <TextField
              label="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              InputProps={{
                style: { backgroundColor: "#f9f9f9", borderRadius: "8px" },
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddTag}
              sx={{
                marginTop: 1,
                borderRadius: "8px",
                backgroundColor: "#6a11cb",
                "&:hover": { backgroundColor: "#2575fc" },
              }}
            >
              Add Tag
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#6a11cb",
                "&:hover": { backgroundColor: "#2575fc" },
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/my-journals")}
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                color: "#6a11cb",
                borderColor: "#6a11cb",
                "&:hover": { borderColor: "#2575fc", color: "#2575fc" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EditJournal;

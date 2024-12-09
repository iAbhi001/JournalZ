import React, { useState } from "react";
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
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateJournal = () => {
  const navigate = useNavigate();

  const [journalData, setJournalData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournalData({ ...journalData, [name]: value });
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!journalData.tags.includes(tagInput.trim())) {
        setJournalData({ ...journalData, tags: [...journalData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setJournalData({
      ...journalData,
      tags: journalData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleSubmit = () => {
    setError("");
    setSuccess("");
    setLoading(true);

    setTimeout(() => {
      if (!journalData.title || !journalData.content) {
        setError("Title and Content are required.");
        setLoading(false);
        return;
      }

      setSuccess("Journal created successfully!");
      setLoading(false);

      setTimeout(() => navigate("/my-journals"), 2000); // Simulate redirect after creation
    }, 1000);
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
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Create New Journal
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

      {/* Tags Input */}
      <Box sx={{ marginTop: 3 }}>
        <TextField
          label="Tags (Press Enter to add)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleTagAdd}
          fullWidth
          variant="outlined"
          margin="normal"
          InputProps={{
            style: { backgroundColor: "#f9f9f9", borderRadius: "8px" },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 2 }}>
          {journalData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "12px" }}
            />
          ))}
        </Box>
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
          {loading ? "Saving..." : "Save Journal"}
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
    </Box>
  );
};

export default CreateJournal;

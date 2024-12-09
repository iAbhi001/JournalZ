import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import API from "../api/axios";

const EditComment = ({ comment, onSave }) => {
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const { data } = await API.patch(`/journals/${comment._id}`, { content });
      onSave(data); // Update the comment in the parent component
    } catch (error) {
      console.error("Error editing comment:", error);
      alert("Failed to edit comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
      />
      <Button
        onClick={handleEdit}
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
};

export default EditComment;

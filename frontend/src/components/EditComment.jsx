import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const EditComment = ({ comment, onSave }) => {
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setLoading(true);
    setTimeout(() => {
      onSave({ ...comment, content: `${content} (Edited)` }); // Simulate update
      setLoading(false);
    }, 1000);
  };

  return (
    <Box>
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        sx={{ marginBottom: 2 }}
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

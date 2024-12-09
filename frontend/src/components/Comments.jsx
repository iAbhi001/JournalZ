import React, { useState } from "react";
import { Box, Typography, Button, TextField, CircularProgress, Alert } from "@mui/material";

const Comments = ({ journalId, journalOwnerId, currentUserId }) => {
  const [comments, setComments] = useState([
    {
      _id: "1",
      content: "This is a great journal entry!",
      user: { _id: "123", name: "John Doe" },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      content: "I completely agree with your thoughts.",
      user: { _id: "456", name: "Jane Smith" },
      createdAt: new Date().toISOString(),
    },
  ]); // Simulated comments
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const newCommentData = {
        _id: Date.now().toString(),
        content: newComment,
        user: { _id: currentUserId, name: "You" },
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newCommentData]); // Append the new comment
      setNewComment(""); // Reset input
      setLoading(false);
    }, 1000);
  };

  const handleEditSave = (updatedComment) => {
    setComments((prev) =>
      prev.map((comment) => (comment._id === updatedComment._id ? updatedComment : comment))
    );
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Add Comment Section */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          fullWidth
        />
        <Button variant="contained" onClick={handleAddComment} disabled={loading}>
          {loading ? "Adding..." : "Post"}
        </Button>
      </Box>

      {/* Comments List */}
      {comments.map((comment) => (
        <Box
          key={comment._id}
          sx={{
            backgroundColor: "#f9f9f9",
            padding: 2,
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            {comment.content}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            Posted by {comment.user.name} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </Typography>

          {/* Edit and Delete Buttons */}
          {(comment.user._id === currentUserId || journalOwnerId === currentUserId) && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="text"
                onClick={() =>
                  handleEditSave({
                    ...comment,
                    content: `${comment.content} (Edited)`,
                  })
                }
              >
                Edit
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Comments;

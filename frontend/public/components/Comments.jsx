import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, CircularProgress, Alert } from "@mui/material";
import API from "../api/axios";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

const Comments = ({ journalId, journalOwnerId, currentUserId }) => {
  const [comments, setComments] = useState([]); // Initialize as an array
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch comments for the journal
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/journals/${journalId}/comments`);
        setComments(data.comments); // Extract `comments` from API response
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [journalId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.post(`/journals/${journalId}/comments`, { journalId, content: newComment });
      setComments((prev) => [...prev, data]); // Append the new comment
      setNewComment(""); // Reset input
    } catch (err) {
      setError("Failed to add comment.");
    } finally {
      setLoading(false);
    }
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
            <>
              <EditComment comment={comment} onSave={handleEditSave} />
              <DeleteComment
                comment={comment}
                journalOwnerId={journalOwnerId}
                currentUserId={currentUserId}
                onDelete={handleDeleteComment}
              />
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Comments;

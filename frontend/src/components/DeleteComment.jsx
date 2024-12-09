import React from "react";
import { Button } from "@mui/material";

const DeleteComment = ({ comment, journalOwnerId, currentUserId, onDelete }) => {
  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (confirm) {
      setTimeout(() => {
        onDelete(comment._id); // Simulate deletion
        alert("Comment deleted successfully.");
      }, 1000);
    }
  };

  const isAuthorized =
    comment.user._id === currentUserId || journalOwnerId === currentUserId;

  if (!isAuthorized) return null;

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteComment;

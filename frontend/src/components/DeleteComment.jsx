import React from "react";
import { Button } from "@mui/material";
import API from "../api/axios";

const DeleteComment = ({ comment, journalOwnerId, currentUserId, onDelete }) => {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (confirm) {
      try {
        await API.delete(`/journals/${comment._id}/${comment.journal}`);
        onDelete(comment._id); // Remove the comment in the parent component
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment.");
      }
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

const express = require("express");
const {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  getPublicJournals,
  deleteJournal,
  toggleVisibility,
  getTags,
  addComment,
  getComment,
  editComment, deleteComment
} = require("../controllers/journalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/public", getPublicJournals);


router.route("/")
  .post(protect, createJournal)
  .get(protect, getJournals);

router.route("/:id")
  .get(protect, getJournalById)
  .put(protect, updateJournal)
  .delete(protect, deleteJournal);

router.patch("/:id/visibility", protect, toggleVisibility);
router.patch("/tags", protect, getTags);
router.post("/:id/comments", protect, addComment); // Add a comment
router.get("/:id/comments", getComment); // Get comments for a journal

// Edit a comment
router.patch("/:commentId", protect, editComment);

// Delete a comment
router.delete("/:commentId/:journalId", protect, deleteComment);

module.exports = router;

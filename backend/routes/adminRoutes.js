const express = require("express");
const {
  getAllPublicJournals,
  getAllUsers,
  updateJournalVisibility,
  deleteJournal,
  deleteUser,
} = require("../controllers/adminController");
const { adminAuth } = require("../middleware/adminAuth");

const router = express.Router();

router.get("/journals", adminAuth, getAllPublicJournals);
router.get("/users", adminAuth, getAllUsers);
router.patch("/journals/:id/visibility", adminAuth, updateJournalVisibility);
router.delete("/journals/:id", adminAuth, deleteJournal);
router.delete("/users/:id", adminAuth, deleteUser);

module.exports = router;

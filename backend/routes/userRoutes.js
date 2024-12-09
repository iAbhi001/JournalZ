const express = require("express");
const { registerUser, loginUser, getUserProfile,editUserProfile,getStreak,forgotPassword,resetPassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, editUserProfile);
router.get("/streak", protect, getStreak);
// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password", resetPassword);
module.exports = router;

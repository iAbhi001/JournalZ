const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/emailService");
const crypto = require("crypto");
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Update activityDates
      const today = new Date().setHours(0, 0, 0, 0);
      const hasActivityToday = user.activityDates.some(
        (date) => new Date(date).setHours(0, 0, 0, 0) === today
      );

      if (!hasActivityToday) {
        user.activityDates.push(new Date());
        await user.save();
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role, // Include role in the response
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, avatar, bio, role } = req.body; // Accept role from request

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar,
      bio,
      role: role || "user", // Default to "user" if no role is specified
      activityDates: [new Date()],
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        avatar: savedUser.avatar,
        bio: savedUser.bio,
        role: savedUser.role,
        token: generateToken(savedUser._id),
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};


// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Edit User Profile
const editUserProfile = async (req, res) => {
  const { name, avatar, bio } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
      token: generateToken(updatedUser._id), // Optionally generate a new token
    });
  } catch (error) {
    console.error("Error in editUserProfile:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const recordActivity = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().setHours(0, 0, 0, 0); // Normalize to midnight

    if (!user.activityDates.some((date) => new Date(date).getTime() === today)) {
      user.activityDates.push(today);
      await user.save();
    }

    next();
  } catch (error) {
    console.error("Error recording activity:", error);
    res.status(500).json({ message: "Failed to record activity." });
  }
};

const getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const streak = user.calculateStreak();
    res.json({ streak, activityDates: user.activityDates });
  } catch (error) {
    console.error("Error fetching streak:", error);
    res.status(500).json({ message: "Failed to fetch streak data." });
  }
};

// Forgot Password Controller
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    const resetLink = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;

    // Send reset email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click the link to reset your password: ${resetLink}`,
      `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    );

    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  editUserProfile,
  getStreak,
  recordActivity,
  forgotPassword, resetPassword
};

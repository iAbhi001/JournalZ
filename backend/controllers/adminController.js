const User = require("../models/User");
const Journal = require("../models/Journal");

// Get all public journals
const getAllPublicJournals = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values
  try {
    const skip = (page - 1) * limit;
    const journals = await Journal.find({ visibility: "public" })
      .skip(skip)
      .limit(Number(limit))
      .populate("user", "name email");
    const totalJournals = await Journal.countDocuments({ visibility: "public" });
    res.status(200).json({
      journals,
      totalPages: Math.ceil(totalJournals / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching journals:", error);
    res.status(500).json({ message: "Failed to fetch journals." });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values
  try {
    const skip = (page - 1) * limit;
    const users = await User.find()
      .skip(skip)
      .limit(Number(limit))
      .select("-password");
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};


// Update journal visibility
const updateJournalVisibility = async (req, res) => {
  const { id } = req.params;
  const { visibility } = req.body;

  if (!["public", "private"].includes(visibility)) {
    return res.status(400).json({ message: "Invalid visibility value." });
  }

  try {
    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found." });
    }

    journal.visibility = visibility;
    await journal.save();

    res.json({ message: `Journal visibility updated to ${visibility}.`, journal });
  } catch (error) {
    console.error("Error updating journal visibility:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a journal
const deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found." });
    }

    await journal.remove();
    res.json({ message: "Journal deleted successfully." });
  } catch (error) {
    console.error("Error deleting journal:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Prevent self-deletion
    if (req.user.id === id) {
      return res.status(403).json({ message: "You cannot delete your own account." });
    }

    // Check if the user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Optionally delete all journals by the user
    await Journal.deleteMany({ user: id });

    // Delete the user
    await User.findByIdAndDelete(id);

    res.json({ message: "User and associated journals deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  getAllPublicJournals,
  getAllUsers,
  updateJournalVisibility,
  deleteJournal,
  deleteUser,
};

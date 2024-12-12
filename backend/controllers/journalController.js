const Journal = require("../models/Journal");
const Comment = require("../models/Comment");

const createJournal = async (req, res) => {
    const { title, category, tags, content, image } = req.body;
  
    try {
      const journal = new Journal({
        title,
        category,
        tags: tags || [], // Ensure tags is an array, default to empty if not provided
        content,
        image,
        user: req.user.id,
      });
  
      const createdJournal = await journal.save();
      res.status(201).json(createdJournal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getPublicJournals = async (req, res) => {
    const { page = 1, limit = 6, tag, month, year } = req.query;
  
    try {
      const query = { visibility: "public" };
  
      // Filter by tag
      if (tag) query.tags = tag;
  
      // Filter by month and year
      if (month && year) {
        query.createdAt = {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${Number(month) + 1}-01`),
        };
      } else if (year) {
        query.createdAt = {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${Number(year) + 1}-01-01`),
        };
      }
  
      const journals = await Journal.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Journal.countDocuments(query);
  
      res.json({
        journals,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch public journals" });
    }
  };
  
  const getJournals = async (req, res) => {
    const { page = 1, limit = 6, tag, year, month } = req.query;
  
    const filter = { user: req.user.id };
  
    if (tag) filter.tags = tag;
    if (year) filter.createdAt = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
    if (month) {
      filter.createdAt = {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      };
    }
  
    try {
      const journals = await Journal.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
  
      const total = await Journal.countDocuments(filter);
  
      res.json({ journals, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

const getJournalById = async (req, res) => {
    try {
      const journal = await Journal.findById(req.params.id).populate("user", "name email avatar");
      if (!journal) {
        return res.status(404).json({ message: "Journal not found" });
      }
  
      // Check if the journal is private and the user is not the owner
      if (journal.visibility === "private" && (!req.user || journal.user._id.toString() !== req.user.id)) {
        return res.status(403).json({ message: "Access denied. This journal is private." });
      }
  
      res.json(journal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateJournal = async (req, res) => {
    const { title, category, tags, content, image } = req.body;
  
    try {
      const journal = await Journal.findById(req.params.id);
      if (!journal) throw new Error("Journal not found");
  
      if (journal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      journal.title = title || journal.title;
      journal.category = category || journal.category;
      journal.tags = tags || journal.tags; // Update tags if provided
      journal.content = content || journal.content;
      journal.image = image || journal.image;
  
      const updatedJournal = await journal.save();
      res.json(updatedJournal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Delete a journal
const deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const journal = await Journal.findById(id);
    console.log(journal)

    if (!journal) {
      return res.status(404).json({ message: "Journal not found." });
    }

    // Delete the journal
    await Journal.deleteOne({ _id: id }); // Alternative to journal.remove()

    res.json({ message: "Journal deleted successfully." });
  } catch (error) {
    console.error("Error deleting journal:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const toggleVisibility = async (req, res) => {
  const { id } = req.params;
  const { visibility } = req.body;

  try {
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    // Ensure only the owner can toggle visibility
    if (journal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    journal.visibility = visibility;
    const updatedJournal = await journal.save();

    res.json(updatedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTags = async (req, res) => {
    try {
      const tags = await Journal.distinct("tags"); // Fetch all unique tags
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  };

  const getComment = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default pagination values
  
    try {
      const comments = await Comment.find({ journal: id })
        .populate("user", "name avatar") // Populate user info
        .sort({ createdAt: -1 }) // Newest comments first
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const totalComments = await Comment.countDocuments({ journal: id });
  
      res.json({
        comments,
        totalComments,
        currentPage: Number(page),
        totalPages: Math.ceil(totalComments / limit),
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};


// Add a comment
const addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (journal.visibility !== "public") {
      return res.status(403).json({ message: "Comments are not allowed on private journals." });
    }

    const comment = new Comment({
      journal: id,
      user: req.user.id,
      content,
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
// Edit a Comment
const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this comment." });
    }

    // Update the comment content
    comment.content = content;
    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (error) {
    console.error("Error in editComment:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a Comment
const deleteComment = async (req, res) => {
  const { commentId, journalId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    const journal = await Journal.findById(journalId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (!journal) {
      return res.status(404).json({ message: "Journal not found." });
    }

    // Check if the user is either the journal owner or the comment author
    if (
      comment.user.toString() !== req.user.id &&
      journal.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized to delete this comment." });
    }

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error in deleteComment:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  getPublicJournals ,
  toggleVisibility,
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getTags,
  addComment,
  getComment,
  editComment,
  deleteComment,
};

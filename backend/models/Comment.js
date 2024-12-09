const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    journal: { type: mongoose.Schema.Types.ObjectId, ref: "Journal", required: true }, // Reference to the journal
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

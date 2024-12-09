const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] }, // Array of tags
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private", // Default to private
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);

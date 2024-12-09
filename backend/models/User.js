const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "https://via.placeholder.com/150", // Default profile picture
  },
  bio: {
    type: String,
    default: "Hello! I'm a journaling enthusiast.", // Default bio
  },
  activityDates: { type: [Date], default: [] }, // Track dates of user activity
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // New role field

});

userSchema.methods.calculateStreak = function () {
  const dates = this.activityDates.map((date) => new Date(date).setHours(0, 0, 0, 0)); // Normalize dates
  dates.sort((a, b) => a - b);

  let streak = 0;
  let currentStreak = 0;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0 || dates[i] - dates[i - 1] <= 24 * 60 * 60 * 1000) {
      // Consecutive or same-day activity
      currentStreak++;
    } else {
      // Non-consecutive activity
      streak = Math.max(streak, currentStreak);
      currentStreak = 1;
    }
  }

  return Math.max(streak, currentStreak);
};

module.exports = mongoose.model("User", userSchema);
        
const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must be provided user name"],
    maxlength: [20, "name must be less than 20 characters"],
  },
  userId: {
    type: String,
    unique: true,
    required: [true, "Must be provided user userId"],
    maxlength: [20, "name must be less than 20 characters"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Must be provided user password"],
    maxlength: [30, "name must be less than 30 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Auth", authSchema);

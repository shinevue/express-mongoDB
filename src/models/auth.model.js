const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must be provided user name"],
  },
  userId: {
    type: String,
    unique: true,
    required: [true, "Must be provided user userId"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Must be provided user password"],
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

authSchema.methods.hide_pwd = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

authSchema.methods.show_pwd = (reqPwd, dbPwd) => {
  return bcrypt.compareSync(reqPwd, dbPwd);
};

module.exports = mongoose.model("Auth", authSchema);

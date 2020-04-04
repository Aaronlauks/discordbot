const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userID: String,
  username: String,
  xp: Number,
  total: Number,
  level: Number,
  cash: Number,
  multiplier: mongoose.Decimal128,
  uses: Number
});

module.exports = mongoose.model("saved", messageSchema);

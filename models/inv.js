const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userID: String,
  username: String,
  pet: String,
  items: Array,
  lastDaily: Number,
  streak: Number
});

module.exports = mongoose.model("inv", messageSchema);

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  channelID: String,
  commandName: Array
});

module.exports = mongoose.model("disable", messageSchema);
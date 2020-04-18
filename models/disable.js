const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  guildID: String,
  channelID: Array
});

module.exports = mongoose.model("disable", messageSchema);
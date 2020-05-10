const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  channelID: String,
  commandName: Array,
  editsOld: Array,
  editsNew: Array,
  deletes: Array
});

module.exports = mongoose.model("disable", messageSchema);
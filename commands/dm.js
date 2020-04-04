exports.run = (bot, message, args) => {
    if(!args[0]) return message.channel.send("<:xcross:658850997757804555> Please supply a username");
    if(!args[2]) return message.channel.send("<:xcross:658850997757804555> Please supply a full sentence with 2 or more words!");
      var mem = message.mentions.members.first()
      let content = args;
  content.shift;
  let mc = content.join(" ");
      if (!mem || !mc) { return; }
      message.delete()
      mem.sendMessage(mc);
      message.channel.send(message.author.username + " sent a DM to " + mem + "!")
  }
  
  module.exports.config = {
    name: "dm",
    description: "Send a DM to the user specified in the command",
    category: "Miscellaneous",
    usage: "a dm <user> <message>",
    accessableby: "Everyone",
    aliases: ["directmessage", "message", "direct"]
  }

const discord = require("discord.js");
const bot = new discord.Client({disableEveryone: true});

exports.run = (bot, message, args) => {
  if(!args[0]) return message.channel.send("Please supply a number")
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('you do not have permissions to use this command!');
  var mc = message.content.split(" ")[1];
  if (mc === null) { return; }
  message.channel.bulkDelete(2)
  message.channel.send("🗑 deleting " + mc + " messages. Please wait...");
  setTimeout(function(){
    message.channel.bulkDelete(mc).catch(e => {
          message.channel.send("I think the message is more than 14 days old D:");
        });
}, 1500);
}

module.exports.config = {
  name: "purge",
  description: "Deletes the number of messages specified in the above command",
  category: "Moderation",
  usage: "a purge <number of messages>",
  accessableby: "Administrators and Moderators",
  aliases: ["prune", "delete"]
}

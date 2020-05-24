const discord = require("discord.js");
const bot = new discord.Client({disableEveryone: true});

exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send("Please supply a username")
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('you do not have permissions to use this command!');
  var mem = message.mentions.members.first();
    if (mem === null) { return; }
    const embed5 = new discord.RichEmbed();
    embed5.setTitle("**__You have more to hear__**");
    embed5.setDescription(
      "🔊 " + mem.displayName + " has been unmuted by " + message.author.username
    );
    embed5.setColor("#ff0000");
    if (message.guild.roles.find("name", "Muted")) {
      mem.removeRole(message.guild.roles.find("name", "Muted")).then(() => {
      //mem.addRole(message.guild.roles.find("name", "🎃 Member 🎃")).then(() => {
          message.channel.send(embed5);
        })
        .catch(e => {
          message.channel.send("Somehow, this user can't be unmuted :C");
        });
    }
}


module.exports.config = {
  name: "unmute",
  description: "Unmutes a user that is muted and has the Muted role",
  usage: "a unmute <username>",
  category: "Moderation",
  accessableby: "Administrators and Moderators",
  aliases: ["umute", "unm"]
}

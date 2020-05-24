const discord = require("discord.js");
const bot = new discord.Client({ disableEveryone: true });


exports.run = (bot, message, args) => {
  if(!args[0]) return message.channel.send("Please supply a username");
  var sender = message.author.username;
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("you do not have permissions to use this command!");
  var mem = message.mentions.members.first();
  if (mem === null) {
    return;
  }
  let content = args;
  content.shift;
  let mc = content.join(" ");
  const embed2 = new discord.RichEmbed();
  embed2.setTitle("**__The Foot has spoken!__**");
  embed2.setDescription(
    "❌ " +
      mem.displayName +
      " has been kicked by " +
      message.author.username +
      "\n" +
      "📩 Reason: " +
      mc
  );
  embed2.setColor("#ff0000");
  mem
    .kick(mc)
    .then(() => {
      message.channel.send(embed2);
    })
    .catch(e => {
      message.channel.send("Somehow, this user can't be kicked :C");
    });
};

module.exports.config = {
  name: "kick",
  description: "Kicks a user specified in the command",
  category: "Moderation",
  usage: "a kick <user> <reason>",
  accessableby: "Administrators and Moderators",
  aliases: ["foot", "kik"]
};

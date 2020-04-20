const discord = require("discord.js");
const bot = new discord.Client({ disableEveryone: true });

exports.run = (bot, message, args) => {
  if(!args[0]) return message.channel.send("Please supply a username");
  let ok;
  if (message.author.id !== '488249600264896523') ok = 1;
  if (!message.member.hasPermission("ADMINISTRATOR") && !ok)
    return message.reply("you do not have permissions to use this command!");
  var mem = message.mentions.members.first();
  if (mem === null) {
    return;
  }
  let content = args;
  content.shift;
  let mc = content.join(" ");
  const embed3 = new discord.RichEmbed();
  embed3.setTitle("**__The Ban Hammer has swung!__**");
  embed3.setDescription(
    "🔨 " +
      mem.displayName +
      " has been banned by " +
      message.author.username +
      "\n" +
      "📩 Reason: " +
      mc
  );
  embed3.setColor("#ff0000");
  mem
    .ban(mc)
    .then(() => {
      message.channel.send(embed3);
    })
    .catch(e => {
      message.channel.send("Somehow, this user can't be banned :C");
    });
};

module.exports.config = {
  name: "hammer",
  description: "Bans a user specified in the command",
  category: "Moderation",
  usage: "a hammer <user> <reason>",
  accessableby: "Moderators",
  aliases: ["banhammer", "ban"]
}

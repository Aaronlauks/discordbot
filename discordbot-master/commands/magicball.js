const Discord = require("discord.js")
 
 module.exports.run = async (bot, message, args) => {

    //!8ball question
    if(!args[1]) return message.reply("<:xcross:658850997757804555> Please enter a full question with 2 or more words!");
    let replies = ["Yes", "No", "I don't know", "Ask again later!", "no u", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", "Lmao no", "Lol okie"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    let ballembed = new Discord.RichEmbed()

    .setAuthor(`${bot.user.username} 8Ball`, message.guild.iconURL)
    .setColor("#00ff00")
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setFooter(
        `© ${message.guild.me.displayName}`,
        bot.user.displayAvatarURL
      );

    message.channel.send(ballembed)

    message.delete();


 }

module.exports.config = {
  name: "magicball",
  description: "This is basically an 8ball but in a discord bot",
  category: "Fun",
  usage: `a magicball <question>`,
  accessableby: "Everyone",
  aliases: ["8b", "ball", "8ball"]
}

const discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const Messages = require("../models/messages.js");

exports.run = async (bot, message, args) => {
  const embed = new RichEmbed()
      .setColor("#00ff15")
      .setFooter(
        `© ${message.guild.me.displayName} | cash command`,
        bot.user.displayAvatarURL
      );
  const getMember = message.mentions.users.first(); 
  let person = getMember
  
  if(person){
    const saved = await Messages.findOne({
      userID: person.id
    });

    embed.setAuthor(`${person.username}'s cash:`, person.avatarURL)
    .setDescription(`**Cash:** $${saved.cash}\n\n**Multiplier:** ${saved.multiplier}\n**Uses left:** ${saved.uses}`);
    message.channel.send(embed)
  }  else {
    const saved = await Messages.findOne({
      userID: message.author.id
    });
    
      embed.setAuthor(`${message.author.username}'s cash:`, message.author.avatarURL)
    .setDescription(`**Cash:** $${saved.cash}\n\n**Multiplier:** ${saved.multiplier}\n**Uses left:** ${saved.uses}`);
    message.channel.send(embed)
  }
}

module.exports.config = {
  name: "cash",
  description: "This command displayes the amount of cash you have!",
  category: "Economy",
  usage: "a cash",
  accessableby: "Everyone",
  aliases: ["bal", "money", "bank", "balance"]
}
      

const discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const Messages = require("../models/messages.js");

exports.run = async (bot, message, args) => {
  const embed = new RichEmbed()
      .setColor("#00ff15")
      .setFooter(
        `© ${message.guild.me.displayName} | level command`,
        bot.user.displayAvatarURL
      );
  const getMember = message.mentions.users.first(); 
  let person = getMember
  
  if(person){
    const saved = await Messages.findOne({
      userID: person.id
    });
    
 
    
    embed.setTitle(`${person.username}'s Level:`);
    embed.setThumbnail(person.avatarURL);
    
    if(saved.xp){
      const targetxp = (saved.level + 1) * 500;
    const remaining = targetxp - saved.xp;
    const nextlevel = saved.level + 1;
      
      let ok = Math.round((saved.xp/targetxp) * 100);
      let percentage = Math.round(ok/10);
      
      if(percentage >= 10){
        const xpbar = "<:xp_orange_start:677119588177149975>" + "<:xp_orange_middle:677119644263383102>".repeat(8) + "<:xp_orange_end:677119662944944130>";
      embed.addField(`XP level`, `${saved.level} ${xpbar} ${nextlevel}\n\`${saved.xp} XP/${targetxp} XP\nRemaining: ${remaining} XP\nTotal: ${saved.total} XP\``);
        message.channel.send(embed);
  
      } else if (percentage >= 1) {
        const xpbar = "<:xp_orange_start:677119588177149975>" + "<:xp_orange_middle:677119644263383102>".repeat(percentage - 1) + "<:xp_black_middle:677119432811872257>".repeat(9 - percentage) + "<:xp_black_end:677119462020874250>";
        embed.addField(`XP level`, `${saved.level} ${xpbar} ${nextlevel}\n\`${saved.xp} XP/${targetxp} XP\nRemaining: ${remaining} XP\nTotal: ${saved.total} XP\``);
        message.channel.send(embed);
      } else {
        const xpbar = "<:xp_black_start:677119305908748289>" + "<:xp_black_middle:677119432811872257>".repeat(8) + "<:xp_black_end:677119462020874250>";
      embed.addField(`XP level`, `${saved.level} ${xpbar} ${nextlevel}\n\`${saved.xp} XP/${targetxp} XP\nRemaining: ${remaining} XP\nTotal: ${saved.total} XP\``);
        message.channel.send(embed);
      }
      
    } else {
      message.channel.send(`<:xcross:658850997757804555> ${person.displayName} does not have any xp :C`);
    }
  } else {
    const saved = await Messages.findOne({
      userID: message.author.id
    });
    
    const targetxp = (saved.level + 1) * 500;
    const remaining = targetxp - saved.xp;
    const nextlevel = saved.level + 1;
    embed.setTitle(`${message.author.username}'s Level`)
      .setThumbnail(message.author.avatarURL);
    
    if(saved.xp){
      
      let ok = Math.round((saved.xp/targetxp) * 100);
      let percentage = Math.round(ok/10);
      
      if(percentage >= 10){
        const xpbar = "<:xp_orange_start:677119588177149975>" + "<:xp_orange_middle:677119644263383102>".repeat(8) + "<:xp_orange_end:677119662944944130>";
      embed.addField(`XP level`, `${saved.level} ${xpbar} ${nextlevel}\n\`${saved.xp} XP/${targetxp} XP\nRemaining: ${remaining} XP\nTotal: ${saved.total} XP\``);
        message.channel.send(embed);

      } else if (percentage >= 1) {
        const xpbar = "<:xp_orange_start:677119588177149975>" + "<:xp_orange_middle:677119644263383102>".repeat(percentage - 1) + "<:xp_black_middle:677119432811872257>".repeat(9 - percentage) + "<:xp_black_end:677119462020874250>";
        embed.addField(`XP level`, `${saved.level} ${xpbar} ${nextlevel}\n\`${saved.xp} XP/${targetxp} XP\nRemaining: ${remaining} XP\nTotal: ${saved.total} XP\``);
        message.channel.send(embed);
      } else {
        const xpbar = "<:xp_black_start:677119305908748289>" + "<:xp_black_middle:677119432811872257>".repeat(8) + "<:xp_black_end:677119462020874250>";
      embed.addField(`XP level`, `${saved.level} ${xpbar} ${nextlevel}\n\`${saved.xp} XP/${targetxp} XP\nRemaining: ${remaining} XP\nTotal: ${saved.total} XP\``);
        message.channel.send(embed);
      }
    } else {
      message.channel.send(`<:xcross:658850997757804555> You do not have any xp :C`);
    }
  }
};


module.exports.config = {
  name: "level",
  description: "This command displayes the amount of xp you have!",
  category: "Economy",
  usage: "a level",
  accessableby: "Everyone",
  aliases: ["xp", "experience", "lv", "lvl"]
}

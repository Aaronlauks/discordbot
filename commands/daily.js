const Messages = require("../models/messages.js"); 
const { RichEmbed } = require("discord.js");
const inv = require("../models/inv.js"); 

exports.run = async (bot, message, args, ops) => {
  const items = ops.items;
  let cooldown = 8.64e+7;
  let amount = 250;
  
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  const saved = await Messages.findOne({
      userID: message.author.id
  });
  let lastDaily = invUser.lastDaily;
  let streak = invUser.streak;
  if(lastDaily != null && cooldown - (Date.now() - lastDaily) > 0) {
    let timeObj = (cooldown - (Date.now() - lastDaily));
    message.channel.send(`<:xcross:658850997757804555> Bro chill, You already collected today's daily\n<a:load:663763329055195157> Please wait **${Math.floor(timeObj / (1000 * 60 * 60))}h ${Math.round((Math.abs((Math.floor(timeObj / 6000000) * 100) - (timeObj / 60000)).toFixed(0)) / 100 * 60)}m**!`); 
  } else if((Date.now() - lastDaily) / cooldown >= 2){
    let index = Math.floor(Math.random() * (items.index.length - 1)) + (items.index.length - 20);
    let item = items.items[index];
    const embed = new RichEmbed()
    .setColor("#8a5555")
    .setAuthor(`Nice one ${message.author.username}`, message.author.avatarURL)
    .setTitle(`You collected your daily and received:`)
    .setDescription(`+ **$${(amount + (streak * 5))}**\n+ 1 **${item.name}** ${item.emoji}`)
    .setFooter(`LOL you lost your streak of ${streak} days!`);
    message.channel.send(embed);
    saved.cash += (amount + (streak * 5));
    invUser.streak = 0;
    invUser.items.splice(index, 1, invUser.items[index] += 1);
    invUser.lastDaily = Date.now();    
  } else {
    let index = Math.floor(Math.random() * (invUser.items.length - 1)) + (invUser.items.length - 20);
    let item = items.items[index];
    const embed = new RichEmbed()
    .setColor("#8a5555")
    .setAuthor(`Nice one ${message.author.username}`, message.author.avatarURL)
    .setTitle(`You collected your daily and received:`)
    .setDescription(`+ **$${(amount + (streak * 5))}**\n+ 1 **${item.name}** ${item.emoji}`)
    .setFooter(`You're on a ${streak} day streak!`);
    message.channel.send(embed);
    saved.cash += (amount + (streak * 5));
    invUser.streak += 1;
    invUser.items.splice(index, 1, invUser.items[index] += 1);
    invUser.lastDaily = Date.now();
  }
  await invUser.save().catch(e => console.log(e));
  await saved.save().catch(e => console.log(e));
}

module.exports.config = {
  name: "daily",
  description: "Collect your daily to get the big bucks",
  category: "Economy",
  usage: `a daily`,
  accessableby: "Everyone",
  aliases: ["dailies"]
}

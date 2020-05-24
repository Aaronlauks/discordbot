const inv = require("../models/inv.js"); 
const Messages = require("../models/messages.js"); 
const { RichEmbed } = require("discord.js");


exports.run = async (bot, message, args, ops) => {
  const items = ops.items;
  const embed = new RichEmbed()
  .setColor("#8a5555");
  
  if(!args[0]) return message.channel.send(`<:xcross:658850997757804555> Bruh you need to **buy** something`);
  let quantity = "";
  if(args[1] && isNaN(args[1])) return message.channel.send(`<:xcross:658850997757804555> urm the amount of items you're buying needs to be a number`);
  if(!args[1]) quantity = 1;
  if(args[1]) quantity = args[1];
  //if(quantity > 10000) return message.channel.send(`<:xcross:658850997757804555> BRO don't break me and buy like a million`);
  let index = "";
  if(items.index.includes(args[0].toLowerCase())) index = items.index.indexOf(args[0].toLowerCase());
  if(!items.index.includes(args[0].toLowerCase())) return message.channel.send(`<:xcross:658850997757804555> urm I don't think that's an item in the shop`);
  let bought = items.items[index];
  
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  const saved = await Messages.findOne({
      userID: message.author.id
  });
  
  if(saved.cash < (bought.price * quantity)) return message.channel.send(`<:xcross:658850997757804555> lol poop you're too poor to afford that`);
  invUser.items.splice(index, 1, invUser.items[index] += +quantity);
  saved.cash -= (bought.price * quantity);
  
  embed.setFooter(
    `You now have $${saved.cash}`
  )
  .setAuthor(`Successfully bought:`, message.author.avatarURL)
  .setTitle(`\`${quantity}\` ${bought.name} ${bought.emoji}`)
  .setDescription(`\`${bought.category} item\``);
  await invUser.save().catch(e => console.log(e));
  await saved.save().catch(e => console.log(e));
  message.channel.send(embed)
}

module.exports.config = {
  name: "buy",
  description: "Buy an item from the shop",
  category: "Economy",
  usage: `a buy <item> <quantity>`,
  accessableby: "Everyone",
  aliases: ["purchase"]
}

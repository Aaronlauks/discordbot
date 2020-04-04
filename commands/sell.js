const inv = require("../models/inv.js"); 
const Messages = require("../models/messages.js"); 
const { RichEmbed } = require("discord.js");

exports.run = async (bot, message, args, ops) => {
  const items = ops.items;
  const embed = new RichEmbed()
  .setColor("#8a5555");
  
  if(!args[0]) return message.channel.send(`<:xcross:658850997757804555> Bruh you need to **sell** something`);
  let quantity;
  if(args[1] && isNaN(args[1])) return message.channel.send(`<:xcross:658850997757804555> urm the amount of items you're selling needs to be a number`);
  if(!args[1]) quantity = 1;
  if(args[1]) quantity = args[1];
  let index = "";
  if(items.index.includes(args[0].toLowerCase())) index = items.index.indexOf(args[0].toLowerCase());
  if(!items.index.includes(args[0].toLowerCase())) return message.channel.send(`<:xcross:658850997757804555> urm I don't think that item is even valid lol`);
  let sell = items.items[index];
  
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  const saved = await Messages.findOne({
      userID: message.author.id
  });
  
  if(invUser.items[index] == 0) return message.channel.send(`<:xcross:658850997757804555> lol imagine selling something you don't have`);
  if(quantity > invUser.items[index]) return message.channel.send(`<:xcross:658850997757804555> Don't try to break me, you don't even have that much!`);
  let cash = Math.ceil(sell.price * quantity / 4);
  if(sell.category == "Collectable") cash = sell.price * quantity;
  
  saved.cash += cash;
  invUser.items.splice(index, 1, invUser.items[index] -= quantity);
  message.channel.send(`<:green_tick:658850714906525697> You sold ${args[1] || "1"} **${args[0]} ${sell.emoji}** and received \`$${cash}\``);
  await invUser.save().catch(e => console.log(e));
  await saved.save().catch(e => console.log(e));
}

module.exports.config = {
  name: "sell",
  description: "Sells an item you want to sell",
  category: "Economy",
  usage: `a sell <item> <quantity>`,
  accessableby: "Everyone",
  aliases: ["sold", "discard"]
}

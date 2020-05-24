const inv = require("../models/inv.js"); 
const { RichEmbed } = require("discord.js");


exports.run = async (bot, message, args, ops) => {
  const items = ops.items;
  const embed = new RichEmbed()
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .setAuthor(`${message.author.username}'s Items:`, message.author.avatarURL);
  
  let invUser = await inv.findOne({
    userID: message.author.id
  });
  let page = 5;
  if(args[0]) page = args[0] * 5;
  
  let total = 0;
  invUser.items.forEach(item => {
    if(item != 0) total++;
  });
  
  embed.setFooter(`Page ${(page/5)}/${Math.ceil(total/5)}`)
  if(total < 5) embed.setFooter(`lol fat`)
  if(Math.ceil(total / 5) < Math.ceil(page / 5) && total > 0) message.channel.send(`<:green_tick:658850714906525697> You're inventory is smol, so I'm gonna show u the first page`);
  if(Math.ceil(total / 5) < Math.ceil(page / 5)) embed.setFooter(`lol fat`);
  if(Math.ceil(total / 5) < Math.ceil(page / 5)) page = 5;
  
  let hasItem = false;
  let index = 0;
  total = 0;
  let descm = "";
  let bought = null;
  let price = 0;
  let minus = 5;
  invUser.items.forEach(item => {
    if(item != 0) hasItem = true;
    if(item != 0) total++;
    if(page > 5) minus = 4;
    if(item != 0 && total >= (page - minus) && total <= page){
      hasItem = true;
      bought = items.items[index];
      price = Math.ceil(bought.price * item / 4)
      if(bought.category == "Collectable") price = bought.price * item;
      descm += `${item} **${bought.name}** ${bought.emoji} | $${price}\n\`${bought.category} item\`\n\n`;
    }
    index++;
  });
  
  if(!hasItem) return message.channel.send(`<:xcross:658850997757804555> You have nothing! Buy something from the shop using \`a buy <item> <quantity>\``);
 
  embed.setDescription(descm);
    message.channel.send(embed);
}

module.exports.config = {
  name: "inv",
  description: "This shows a list of items you own",
  category: "Economy",
  usage: `a inv <number>`,
  accessableby: "Everyone",
  aliases: ["inventory", "items", "item"]
}

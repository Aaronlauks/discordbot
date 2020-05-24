const inv = require("../models/inv.js"); 
const { RichEmbed } = require("discord.js");


exports.run = async (bot, message, args, ops) => {
  const items = ops.items;
  const embed = new RichEmbed()
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .setTitle(`Pusheen Shop`)
  .setDescription(`__ Tags __\n\`Collectable item\` ─ Sells for how much you buy it for\n\`Food item\` ─ Used for feeding animals`);
  
  let page = 5;
  if(args[0]) page = args[0] * 5;
  let total = items.index.length;
  embed.setFooter(`Page ${(page/5)}/${Math.ceil(total/5)}`)
  
  let descm = ``;
  let item = "";
  var i;
  for(i = page - 5; i < page; i++){
    item = items.items[i];
    if(item) descm += `**${item.name} ${item.emoji}** | $${item.price}\n\`${item.category} item\`\n${item.Description}\n\n`;
  }

   embed.addField(`Cool items`, descm);
    message.channel.send(embed);
}

module.exports.config = {
  name: "shop",
  description: "This shows the list of items you can buy",
  category: "Economy",
  usage: `a shop <number>`,
  accessableby: "Everyone",
  aliases: ["store", "outlet"]
}

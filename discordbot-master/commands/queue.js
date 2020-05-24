const discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {
  
  let bruh = ops.active.get(message.guild.id);
  
  if(!bruh) return message.channel.send("<:xcross:658850997757804555> There isn't any music playing right now :C");
  if(!bruh.queue[0]) return message.channel.send("<:xcross:658850997757804555> There isn't any music playing right now :C");
  console.log(args[0]);
   
  let queue = bruh.queue;
  let nowPlaying = queue[0];
  
  let resp = `__**Now Playing**__\n**${nowPlaying.songTitle}**\n**Requested By:** *${nowPlaying.requester}*`;
  
  if(queue.length > 11){
    if(args[0]){
      if(!queue[args[0]]) return message.channel.send("<:xcross:658850997757804555> Please enter a number >:C");
      let tab = (args[0] * 10) + 1;
      if(tab > queue.length){
        tab = queue.length;
      }
      let start = (args[0] * 10) - 9;
      let size = Math.ceil(queue.length / 10);
      let current = args[0]; 
      let length = queue.length - 1;
      resp += `\n\n__**Queue**__ [${current}/${size}]`;
      for(var i = start; i < tab; i++) {
        resp += `\n\n${i}. **${queue[i].songTitle}**\n**Requested By:** *${nowPlaying.requester}*`;
      
      } 
      
      const embed = new discord.RichEmbed()
      .setTitle("Aaron's bot music queue")
      .setThumbnail("https://cdn.discordapp.com/attachments/574494832148480001/662678910005149707/araragiPlatDance.gif")
      .setDescription(resp)
      .setColor("#00ff15")
      .setFooter(
        `© ${message.guild.me.displayName} | Total Songs in Queue: ${length}`,
        bot.user.displayAvatarURL
      );
      return message.channel.send(embed);
      
    } else {
      let size = Math.ceil(queue.length / 10);
      resp += `\n\n__**Queue**__ [1/${size}]`;
      for(var i = 1; i < 11; i++) {
        resp += `\n\n${i}. **${queue[i].songTitle}**\n**Requested By:** *${nowPlaying.requester}*`;
      
      } 
    }
  } else if(queue.length == 1){
    let size = Math.ceil(queue.length / 10);
      resp += `\n\n__**Queue**__ [1/${size}]`;
    resp += `\n**No music added to queue**`;
  } else {
    let size = Math.ceil(queue.length / 10);
      resp += `\n\n__**Queue**__ [1/${size}]`;
    for(var i = 1; i < queue.length; i++) {
      resp += `\n\n${i}. **${queue[i].songTitle}**\n**Requested By:** *${nowPlaying.requester}*`;

    } 
  }
  console.log(queue.length);
  let size = Math.ceil(queue.length / 10);
  let current = 1; 
  
  let length = queue.length - 1;
  const embed = new discord.RichEmbed()
  .setTitle("Aaron's bot music queue")
  .setThumbnail("https://cdn.discordapp.com/attachments/574494832148480001/662678910005149707/araragiPlatDance.gif")
  .setDescription(resp)
  .setColor("#00ff15")
  .setFooter(
        `© ${message.guild.me.displayName} | Total Songs in Queue: ${length}`,
        bot.user.displayAvatarURL
      );
  message.channel.send(embed);
}

module.exports.config = {
  name: "queue",
  description: "Displays the queue of the songs you added",
  category: "Music",
  usage: "a queue",
  accessableby: "Everyone",
  aliases: ["q", "list"]
}

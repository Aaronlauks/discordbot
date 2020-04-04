
exports.run = (bot, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  
 

  if(!fetched) return message.channel.send(`<:xcross:658850997757804555> Heck, there isn't any music playing`);
  //check if you are in a voice channel
  if(!message.member.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Come on, at least join a voice channel! >:L");
  //check if bot is connected to a voice channel
  if(!message.guild.me.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Bruh I'm not even **in** a voice channel :L");
  //check if you and the bot are in the same voice channel
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("<:xcross:658850997757804555> The heck dude, join the same voice channel as me :l")
   
    if(!fetched.queue[args[0]]) return message.channel.send(`<:xcross:658850997757804555> Please input a queue number >:C`);
    let skip = args[0];
    if (fetched.queue.indexOf(skip) > 0) {
        fetched.queue.splice(fetched.queue.indexOf(skip), 1);
        fetched.queue.unshift(skip)
        message.channel.send(`<:tick:658850714906525697> Skipped to __**${fetched.queue[0].songTitle}**__!`);
    }
}

module.exports.config = {
  name: "skipto",
  description: "Skips to a somg in the queue you mention",
  category: "Music",
  usage: "a$skipto <queue number>",
  accessableby: "Everyone",
  aliases: ["st", "jump" ]
}

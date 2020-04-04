exports.run = (bot, message, args, ops) => {
  
  let fetched = ops.active.get(message.guild.id);
  
  if(!fetched) return message.channel.send(`<:xcross:658850997757804555> Heck, there isn't any music playing`);
  //check if you are in a voice channel
  if(!message.member.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Come on, at least join a voice channel! >:L");
  //check if bot is connected to a voice channel
  if(!message.guild.me.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Bruh I'm not even **in** a voice channel :L");
  //check if you and the bot are in the same voice channel
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("<:xcross:658850997757804555> The heck dude, join the same voice channel as me :l");
  if(fetched.dispatcher.paused) return message.channel.send(`<:xcross:658850997757804555> R u __blind__? The music is already paused!`);
  //confirmation message
  fetched.dispatcher.pause();
  message.channel.send(`<:tick:658850714906525697> Successfully paused **${fetched.queue[0].songTitle}!**`);
  
}

module.exports.config = {
  name: "pause",
  description: "Pauses the music currently playing in the queue",
  category: "Music",
  usage: "a$pause",
  accessableby: "Everyone",
  aliases: ["stopplaying", "p"]
}

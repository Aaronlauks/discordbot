exports.run = (bot, message, args, ops) => {
  
  let fetched = ops.active.get(message.guild.id);
  
  if(!fetched) return message.channel.send(`<:xcross:658850997757804555> Heck, there isn't any music playing`);
  //check if you are in a voice channel
  if(!message.member.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Come on, at least join a voice channel! >:L");
  //check if bot is connected to a voice channel
  if(!message.guild.me.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Bruh I'm not even **in** a voice channel :L");
  //check if you and the bot are in the same voice channel
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("<:xcross:658850997757804555> The heck dude, join the same voice channel as me :l");

	
    fetched.dispatcher.pause();
    let vc =  bot.guilds.get(fetched.guildID).me.voiceChannel;//This gets the voiceChannel of the bot in the server
        if(vc) vc.leave();
	
	fetched.queue = [];
	if(fetched.dispatcher) ops.active.delete(dispatcher.guildID);
	
    return message.channel.send(`<:nepShocked:662688179522109450> Successfully stopped and removed all music queues!`);

}

module.exports.config = {
  name: "stop",
  description: "Removes all songs from queue",
  category: "Music",
  usage: "a stop",
  accessableby: "Everyone",
  aliases: ["fuckoff", "disconnect", "remove"]
}

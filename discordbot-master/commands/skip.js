
exports.run = (bot, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  
 

  if(!fetched) return message.channel.send(`<:xcross:658850997757804555> Heck, there isn't any music playing`);
  //check if you are in a voice channel
  if(!message.member.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Come on, at least join a voice channel! >:L");
  //check if bot is connected to a voice channel
  if(!message.guild.me.voiceChannel) return message.channel.send("<:xcross:658850997757804555> Bruh I'm not even **in** a voice channel :L");
  //check if you and the bot are in the same voice channel
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("<:xcross:658850997757804555> The heck dude, join the same voice channel as me :l");
  
  if(fetched.queue[args[0]]){
    let skip = args[0]
    
    let userCount = message.member.voiceChannel.members.size;
  
  let required = Math.ceil(userCount/2);
  
  if(!fetched.queue[skip].voteSkips) fetched.queue[skip].voteSkips = [];
  
  
  if(fetched.queue[skip].voteSkips.includes(message.member.id)) return message.channel.send(`<a:fatYosh:663281932871925761> You already voted to skip! __${fetched.queue[skip].voteSkips.length}/${required} required__`);

  fetched.queue[skip].voteSkips.push(message.member.id);
  
  ops.active.set(message.guild.id, fetched);
  
  if(fetched.queue[skip].voteSkips.length >= required) {
    message.channel.send(`<a:fatYosh:663281932871925761> Successfully removed __**${fetched.queue[skip].songTitle}**__ from Queue!`);
    
    return fetched.queue.splice(skip, 1);

  }
    
  }else{

  

  let userCount = message.member.voiceChannel.members.size;
  
  let required = Math.ceil(userCount/2);
  
  if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
  
  
  if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`<a:fatYosh:663281932871925761> You already voted to skip! __${fetched.queue[0].voteSkips.length}/${required} required__`);

  fetched.queue[0].voteSkips.push(message.member.id);
  
  ops.active.set(message.guild.id, fetched);
  
  if(fetched.queue[0].voteSkips.length >= required) {
    message.channel.send(`<a:fatYosh:663281932871925761> Successfully skipped __**${fetched.queue[0].songTitle}**__!`);
    
    return fetched.dispatcher.end('finish');

  }
  }
}

module.exports.config = {
  name: "skip",
  description: "Skips the song now playing",
  category: "Music",
  usage: "a skip",
  accessableby: "Everyone",
  aliases: ["skipsong", "s" ]
}

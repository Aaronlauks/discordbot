const discord = require('discord.js');

exports.run = (bot, message, args, ops) => {

  let data = ops.active.get(message.guild.id);

  if(!data) return message.channel.send(`<:xcross:658850997757804555> Heck, there isn't any music playing`);
  //check if you are in a voice channel
  if(!message.member.voiceChannel) return message.channel.send(":xcross: Come on, at least join a voice channel! >:L");
  //check if bot is connected to a voice channel
  if(!message.guild.me.voiceChannel) return message.channel.send(":xcross: Bruh I'm not even in a voice channel :L");
  //check if you and the bot are in the same voice channel
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(":xcross: The heck dude, join the same voice channel as me :l");

  if(data.queue[0].playlist){
    
   const embed = new discord.RichEmbed()
   
	.setAuthor(`Now Playing From Playlist:`, "https://cdn.discordapp.com/attachments/574494832148480001/663005389318782977/bongocat.gif")
	.setTitle(`${data.queue[0].songTitle}`)
	.setURL(data.queue[0].url)
		.addField(`Playlist Channel:`, `${data.queue[0].playlistChannel}`, true)
		.addField(`Playlist Title:`, `${data.queue[0].playlistTitle}`, true)
	.addField(`Song Channel Name:`, `${data.queue[0].songAuthor}`, true)
	.setColor("#00ff15")
	.setFooter(`© Aaron's Bot | Requested by: ${data.queue[0].requester}`,bot.user.displayAvatarURL);
	
	bot.channels.get(data.queue[0].announceChannel).send(embed); 
  } else if(!data.queue[0].playlist) {
   
    let length = secondsToHms(data.queue[0].songLength);
	let views = viewer(data.queue[0].songViews);
	
	const embed = new discord.RichEmbed()
	.setAuthor(`Now Playing:`, "https://cdn.discordapp.com/attachments/574494832148480001/663005389318782977/bongocat.gif")
	.setTitle(`${data.queue[0].songTitle}`)
	.setURL(data.queue[0].url)
	.addField(`Channel Name:`, `${data.queue[0].songAuthor}`, true)
	.addField(`Song Length:`, `${length}`, true)
	.addField(`Song Rating:`, `${data.queue[0].songRating}/5`, true)
	.addField(`Views:`, `${views}`, true)
	.setColor("#00ff15")
	.setFooter(`© Aaron's Bot | Requested by: ${data.queue[0].requester}`,bot.user.displayAvatarURL);
	
	
	bot.channels.get(data.queue[0].announceChannel).send(embed);

  }
}
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return hDisplay + mDisplay + sDisplay; 
}
function viewer(d) {
	d = Number(d);
	
	if(d >= 1000000) {
		var L = Math.round(d * 100.0 / 1000000) / 100;
		return L + `M`;
	} else if(d >= 1000) {
		var F = d / 1000;
		return F + `K`;
	}
}

module.exports.config = {
  name: "np",
  description: "This shows the music currently playing in the queue",
  category: "Music",
  usage: "a np",
  accessableby: "Everyone",
  aliases: ["nowplay", "nowplaying", "playing"]
}

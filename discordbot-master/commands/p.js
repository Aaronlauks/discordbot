const ytdl = require('ytdl-core');
const discord = require("discord.js");

const YouTube = require('simple-youtube-api');

const youtube = new YouTube(process.env.GOOGLE_API_KEY);

module.exports.run = async (bot, message, args, ops) => {
    
    console.log(args);
    //check if user is in vc
    if(!message.member.voiceChannel) return message.channel.send('<:xcross:658850997757804555> Please connect to a voice channel >:C');

    //check if no url sent
    if(!args[0]) return message.channel.send('<:xcross:658850997757804555> Please input a url >:C');
	

		let searchOpt = args.join(' ');




    //Validateinput is a url
    
	
        
    if (searchOpt.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
	    message.channel.send(`<a:load:663763329055195157> Loading Playlist...`);
	    let data = ops.active.get(message.guild.id) || {};
	    
	    
	    if(!data.connection) data.connection = await message.member.voiceChannel.join();
	    if(!data.queue) data.queue = [];
	    
	    data.guildID = message.guild.id;
	    const playlist = await youtube.getPlaylist(searchOpt);

	    const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {

		    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
		    data.queue.push({
			    songTitle: video.title,
			    songAuthor: video2.channel.title,
			    playlistChannel: playlist.channelTitle,
			    playlistTitle: playlist.title,
			    requester: `${message.author.tag}'s Requested Playlist`,
			    url: `https://www.youtube.com/watch?v=${video.id}`,
			    announceChannel: message.channel.id,
			    playlist: true
		    });
		    console.log(`Loaded Song #${data.queue.length}`);
			}
	    ops.active.set(message.guild.id, data);
	    if(!data.dispatcher) play(bot, ops, data);
	    message.channel.fetchMessages().then(msgs => {
	    let msgDel = msgs.filter(msgss => msgss.content.includes(`Load`)) // Finds all messages with 'check'
	    message.channel.bulkDelete(msgDel)
	    });
	    return message.channel.send(`<a:padoru_spin:661182228407123968> Added playlist to Queue!`);
		}
	let validate = await ytdl.validateURL(args[0]);
    if(!validate) {
	    
	    try{
		    var videos = await youtube.searchVideos(searchOpt, 1);
		    var video = await youtube.getVideoByID(videos[0].id);
	    } catch {
		    return message.channel.send("<:xcross:658850997757804555> I could not obtain any search results");
	    }
	    let url = `https://www.youtube.com/watch?v=${video.id}`;
	    
    //retrieve info of the video
    let info = await ytdl.getInfo(url).catch(reason => {
	    console.log("ok123 " + reason);
	    return message.channel.send("<:xcross:658850997757804555> I could not obtain any search results");
    })

    //fetch active
    let data = ops.active.get(message.guild.id) || {};
    
    //updating data
    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    
    //pushing the url to a queue
	data.queue.push({
		songTitle: info.player_response.videoDetails.title,
		songLength: info.player_response.videoDetails.lengthSeconds,
		songAuthor: info.player_response.videoDetails.author,
		songRating: info.player_response.videoDetails.averageRating,
		songViews: info.player_response.videoDetails.viewCount,
		requester: message.author.tag,
		url: info.video_url,
		announceChannel: message.channel.id
	});
    
	    if(!data.dispatcher) play(bot, ops, data);

	    let latestQ = data.queue.length - 1;
	    let length = secondsToHms(data.queue[latestQ].songLength);
	    let views = viewer(data.queue[latestQ].songViews);
	    
	    const embed = new discord.RichEmbed()
	.setAuthor(`Added to queue:`, message.author.avatarURL)
	.setTitle(`${data.queue[latestQ].songTitle}`)
	.setURL(data.queue[latestQ].url)
	.addField(`Channel Name:`, `${data.queue[latestQ].songAuthor}`, true)
	.addField(`Song Length:`, `${length}`, true)
	.addField(`Song Rating:`, `${data.queue[latestQ].songRating}/5`, true)
	.addField(`Views:`, `${views}`, true)
	.setColor("#00ff15")
	.setFooter(`© Aaron's Bot | Requested by: ${data.queue[0].requester}`,bot.user.displayAvatarURL);
	    //send latest music
        message.channel.send(embed);

    
    //update the map
    ops.active.set(message.guild.id, data);
    } else {

	    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
 
	
    
    //retrieve info of the video
    let info = await ytdl.getInfo(url).catch(reason => {
	    console.log("ok123 " + reason);
	    return message.channel.send("<:xcross:658850997757804555> I could not obtain any search results");
    })

    //fetch active
    let data = ops.active.get(message.guild.id) || {};
    
    //updating data
    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    
    //pushing the url to a queue
	data.queue.push({
		songTitle: info.player_response.videoDetails.title,
		songLength: info.player_response.videoDetails.lengthSeconds,
		songAuthor: info.player_response.videoDetails.author,
		songRating: info.player_response.videoDetails.averageRating,
		songViews: info.player_response.videoDetails.viewCount,
		requester: message.author.tag,
		url: info.video_url,
		announceChannel: message.channel.id
	});
    
	    if(!data.dispatcher) play(bot, ops, data);
    
	    let latestQ = data.queue.length - 1;
	    let length = secondsToHms(data.queue[latestQ].songLength);
	    let views = viewer(data.queue[latestQ].songViews);
	    
	    const embed = new discord.RichEmbed()
	.setAuthor(`Added to queue:`, message.author.avatarURL)
	.setTitle(`${data.queue[latestQ].songTitle}`)
	.setURL(data.queue[latestQ].url)
	.addField(`Channel Name:`, `${data.queue[latestQ].songAuthor}`, true)
	.addField(`Song Length:`, `${length}`, true)
	.addField(`Song Rating:`, `${data.queue[latestQ].songRating}/5`, true)
	.addField(`Views:`, `${views}`, true)
	.setColor("#00ff15")
	.setFooter(`© Aaron's Bot | Requested by: ${data.queue[0].requester}`,bot.user.displayAvatarURL);
	    //send latest music
        message.channel.send(embed);

    
    //update the map
    ops.active.set(message.guild.id, data);
    }
}

async function play(bot, ops, data) {

	
	console.log(data.queue[0].url)
	data.dispatcher =  await data.connection.playStream(ytdl(data.queue[0].url))
		.on('end', reason => {
			if (reason === 'This video is unavailable') bot.channels.get(data.queue[0].announceChannel).send(`<a:senkobutgay:659236872895332352> Tried to play __**${data.queue[0].songTitle}**__ but it was unavailable :C`);
			else console.log(reason);

		})
	.on('error', error => console.error(error));
	//dispatcher data

	
	data.dispatcher.guildID = data.guildID;
	
    
	//run a finish function
	data.dispatcher.once('end', function() {
		finish(bot, ops, this);
	});
}




function finish(bot, ops, dispatcher) {
    
    //fetch the guild object from activeMap
    let fetched = ops.active.get(dispatcher.guildID);
	
	
	if(!fetched) return play(bot, ops);

	
	
    //then, check if queue empty
    if(fetched.queue.length > 0) {
	    //REMOVE FIRST ITEM IN QUEUE
	if(fetched) fetched.queue.shift();
        ops.active.set(dispatcher.guildID, fetched);

        play(bot, ops, fetched);



    } else {
        ops.active.delete(dispatcher.guildID);
	    
	    let announce = fetched.queue[0].announceChannel
        //REMOVE FIRST ITEM IN QUEUE
	if(fetched) fetched.queue.shift();
	
	    const embed = new discord.RichEmbed()
	    .setTitle("The Jam has ended!")
	    .setAuthor(`Disconnecting now...`, "https://cdn.discordapp.com/attachments/574494832148480001/663392390672941057/cross.png")
	    .setColor("#00ff15")
	    .setFooter(`© Aaron's Bot | End of Queue`,bot.user.displayAvatarURL);
	    try {
	    bot.channels.get(announce).send(embed);
	    } catch (e) {
		    console.log(e)
	    }
        let vc =  bot.guilds.get(dispatcher.guildID).me.voiceChannel;//This gets the voiceChannel of the bot in the server
        if(vc) vc.leave();
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
  name: "p",
  description: "plays a song from a playlist or youtube url or search a music to play",
  category: "Music",
  usage: "a p <link or music name>",
  accessableby: "Everyone",
  aliases: ["song"]
}

const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const Canvas = require('canvas');

exports.run = async (bot, message, args, ops) => {
  const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage('./bg.jpg');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	// Use helpful Attachment class structure to process the file for you
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	message.channel.send(`cool picture test`, attachment);
}

module.exports.config = {
  name: "canvas",
  description: "testing",
  category: "Economy",
  usage: `a canvas`,
  accessableby: "Everyone",
  aliases: ["test", "wip"]
}

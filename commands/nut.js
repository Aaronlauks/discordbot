
const Discord = require("discord.js");
var Jimp = require("jimp");

exports.run = async function (bot, message, args) {
    const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage('./image/nut.jpg');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	// Use helpful Attachment class structure to process the file for you
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	message.channel.send(`nut`, attachment);
}

module.exports.config = {
    name: "nut",
    description: "gives an image of nut button",
    category: "Fun",
    usage: "a nut <mention>",
    accessableby: "Everyone",
    aliases: ["nutt", "peanut"]
  }
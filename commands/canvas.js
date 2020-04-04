const { RichEmbed, Attachment } = require("discord.js");
const Discord = require("discord.js");
const Canvas = require('canvas');

exports.run = async (bot, message, args, ops) => {
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./bg.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Select the color of the stroke
	ctx.strokeStyle = '#74037b';
	// Draw a rectangle with the dimensions of the entire canvas
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	const attachment = new Attachment(canvas.toBuffer(), 'welcome-image.png');

	message.channel.send('insert image here:', attachment);
}

module.exports.config = {
  name: "canvas",
  description: "testing",
  category: "Economy",
  usage: `a canvas`,
  accessableby: "Everyone",
  aliases: ["test", "wip"]
}

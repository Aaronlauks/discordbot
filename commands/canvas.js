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
	
	// Select the font size and type from one of the natively available fonts
	ctx.font = '60px sans-serif';
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '#ffffff';
	// Actually fill the text with a solid color
	ctx.fillText(args.join(" "), canvas.width / 2.5, canvas.height / 1.8);

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

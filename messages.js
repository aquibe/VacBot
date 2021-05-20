const Discord = require('discord.js')
module.exports.aboutMessage = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Welcome to VacBot')
	.setDescription("Hey, I'm VacBot .... description")
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Note', value: 'DM bot to use the bot. Bot will not provide services in channels.'}
	);

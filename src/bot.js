require('dotenv').config()
const scrapper = require('./scrapper');
const telegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_API

const bot = new telegramBot(token, {polling: true});

bot.onText(/\/start/, function(msg) {
    const chatId = msg.chat.id
    const message = "Welcome to the *All In One Bot Downloader*\nYou can download media from your favorite social media.\nFor help, just type /help in the chat."
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
})

bot.onText(/\/help/, function(msg) {
    const chatId = msg.chat.id
    const message = "You can download media from different sources, such as:\n*Instagram*\n*Twitter*\n*Pinterest*\n*TikTok*\n*YouTube*\n*Reddit*\n*Facebook*\n*SoundCloud*\nand many others...\n\n*Download Guide:* Just send the entire media link in the chat and wait for the bot response.\nEnjoy your bot :)"
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
})

bot.on('message', async function(msg) {
    if (msg.text.startsWith('https://')) {
        chatId = msg.chat.id
    }

})
require('dotenv').config()
const scrapper = require('./scrapper');
const telegramBot = require('node-telegram-bot-api');
const instaScrapper = require('../handlers/instagram')
const path = require('path');
const requireAll = require('require-all');

// Import handlers
const folderPath = path.join(__dirname, '../handlers');
const modules = requireAll({dirname: folderPath});
console.log(modules)


// Telegram API
const token = process.env.TELEGRAM_API

// Declaring the bot
const bot = new telegramBot(token, {polling: true});

// Create /start command
bot.onText(/\/start/, function(msg) {
    const chatId = msg.chat.id
    const message = "Welcome to the *All In One Bot Downloader*\nYou can download media from your favorite social media.\nFor help, just type /help in the chat."
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
})

// Create /help command
bot.onText(/\/help/, function(msg) {
    const chatId = msg.chat.id
    const message = "You can download media from different sources, such as:\n*Instagram*\n*Twitter*\n*Pinterest*\n*TikTok*\n*YouTube*\n*Reddit*\n*Facebook*\n*SoundCloud*\nand many others...\n\n*Download Guide:* Just send the entire media link in the chat and wait for the bot response.\nEnjoy your bot :)"
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
})

// Listening to the user message and return media file from social media
bot.on('message', async function(msg) {
    const chatId = msg.chat.id
    const jsonResponse = await scrapper(msg.text)
    for (const handlerName in modules) {
    if (msg.text.startsWith(modules[handlerName].linkPrefix)) {
        modules[handlerName].handle(bot, chatId, jsonResponse)
        break
    }
    }
})
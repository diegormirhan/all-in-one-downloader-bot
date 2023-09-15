require('dotenv').config()
const scrapper = require('./scrapper');
const telegramBot = require('node-telegram-bot-api');
const instaScrapper = require('../handlers/instagram')

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
    const chatId = msg.chat.id
    const jsonRespose = await scrapper(msg.text)

    if (msg.text.startsWith('https://www.instagram.com')) {
        await instaScrapper(bot, chatId, jsonRespose, scrapper)
    } else if (msg.text.startsWith('https://youtube.com') || msg.text.startsWith('https://youtu.be')){
        
    } else if (msg.text.startsWith('https://twitter.com')){
        
    } else if (msg.text.startsWith('https://pinterest.com')){
        
    } else if (msg.text.startsWith('https://facebook.com')){
        
    } else if (msg.text.startsWith('https://reddit.com')){
        
    } else if (msg.text.startsWith('https://souncloud.com')){
        
    } else if (msg.text.startsWith('https://tiktok.com')){
        
    }
})
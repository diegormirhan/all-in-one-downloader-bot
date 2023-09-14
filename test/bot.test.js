require('dotenv').config()
const telegramBot = require('node-telegram-bot-api');
const scrapper = require('./scrapper.test')
const { expect } = require('chai')

const token = process.env.TELEGRAM_API

const bot = new telegramBot(token, {polling: true});

bot.on('message', async function(msg) {
    if (msg.text.startsWith('https://')) {
        chatId = msg.chat.id
    }

})
require('dotenv').config()
const telegramBot = require('node-telegram-bot-api');

// Telegram API
const token = process.env.TELEGRAM_API

// Declaring the bot
const bot = new telegramBot(token, {polling: true});

// Handling errors
bot.on('polling_error', (error) => {
    console.log('---- Telegram Polling Error ----');  // => 'EFATAL'
  });

// Exporting the bot instance
module.exports = {
    bot
}
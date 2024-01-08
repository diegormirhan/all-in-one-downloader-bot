require('dotenv').config()
const telegramBot = require('node-telegram-bot-api');

const port = process.env.PORT || 3000; // Use the provided port or a default one (e.g., 3000)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Telegram API
const token = process.env.TELEGRAM_API

// Declaring the bot
const bot = new telegramBot(token, {polling: true});

// Exporting the bot instance
module.exports = {
    bot
}

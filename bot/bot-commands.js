const { bot } = require('../src/telegram')
const runMongoDb = require('../bot/get-userId')
const { userUpdates } = require('./user-updates')


// Create the commands
bot.onText(/\/start/, startCommand)
bot.onText(/\/help/, helpCommand)
bot.onText(/\/update/, updateCommand)


// Create the command functions
function startCommand(msg) {
    const chatId = msg.chat.id
    const message = "Welcome to the *All In One Bot Downloader*\nYou can download media from your favorite social media.\nFor help, just type /help in the chat."
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
    runMongoDb(msg, chatId);
}

function helpCommand(msg) {
    const chatId = msg.chat.id
    const message = "You can download media from different sources, such as:\n*Instagram*\n*Twitter*\n*Pinterest*\n*TikTok*\n*YouTube*\n*Reddit*\n*Facebook*\n*SoundCloud*\nand many others...\n\n*Download Guide:* Just send the entire media link in the chat and wait for the bot response.\nEnjoy your bot :)"
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'});
}

function updateCommand(msg) {
    const chatId = msg.chat.id
    adminId = process.env.ADMIN_ID
    if (chatId == adminId) {
        userUpdates(bot, chatId)
    } else {
        bot.sendMessage(chatId, "You don't have permission to use this command!")
    }
}
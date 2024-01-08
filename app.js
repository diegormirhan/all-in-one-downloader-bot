require('dotenv').config()
const bot = require('./src/telegram');
const getMedia = require('./bot/get-media')
const botCommands = require('./bot/bot-commands')
const getUserID = require('./bot/get-userId')

console.log('-- Bot is alive! --')

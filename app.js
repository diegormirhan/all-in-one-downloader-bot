require('dotenv').config()
const bot = require('./src/telegram');
const getMedia = require('./bot/get-media')
const botCommands = require('./bot/bot-commands')
const getUserID = require('./bot/get-userId')

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

console.log('-- Bot is alive! --')

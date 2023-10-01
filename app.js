require('dotenv').config()
const bot = require('./src/telegram');
const getMedia = require('./bot/get-media')
const botCommands = require('./bot/bot-commands')
const getUserID = require('./bot/get-userId')
const fastify = require('fastify')({
    logger: false
})


// Declaring fastify 3000 port route
fastify.listen({port: process.env.PORT || 3000}, function (err, adress) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});



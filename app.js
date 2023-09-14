require('dotenv').config()
const bot = require('./src/bot');
const fastify = require('fastify')({
    logger: false
})

fastify.listen({port: process.env.PORT || 3000}, function (err, adress) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});



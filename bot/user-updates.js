require('dotenv').config()
const { idCollection } = require('../database/mongodb')

/**
 * Executes a series of tasks to update user information.
 *
 * @param {Object} bot - The bot object used to interact with the chat.
 * @param {number} chatId - The ID of the chat where the updates will be sent.
 * @return {Promise} A promise that resolves when the updates are complete.
 */
const userUpdates = async (bot, chatId) => {
    const documents = await idCollection.find({}).toArray();
    const reply_markup = {
        force_reply: true,
        selective: true
    }
    bot.sendMessage(chatId, '*Please enter the admin password:*', { parse_mode: 'Markdown', reply_markup: reply_markup })

    bot.once('message', (msg) => {
        const adminPassword = process.env.ADMIN_PASSWORD

        if (adminPassword === msg.text && msg.reply_to_message) {
            bot.sendMessage(chatId, '*Admin sucess authorized!*\nType the message you want to send to the users below:', { parse_mode: 'Markdown', reply_markup: reply_markup })
            bot.once('message', (msg) => {
                if (msg.reply_to_message) {
                    documents.forEach((doc) => {
                        bot.sendMessage(doc.id, msg.text, { parse_mode: 'Markdown' })
                    })
                } else {
                    bot.sendMessage(chatId, '*Operation denied!*', { parse_mode: 'Markdown' })
                }
            })
        } else if (!msg.reply_to_message) {
            bot.sendMessage(chatId, '*Operation denied!*', { parse_mode: 'Markdown' })
        } else {
            bot.sendMessage(chatId, '*Wrong password!*', { parse_mode: 'Markdown' })
        }
    })
}

module.exports = {
    userUpdates
}


require('dotenv').config()
const { idCollection } = require('../database/mongodb')

const userUpdates = async (bot, chatId) => {
    const documents = await idCollection.find({}).toArray();
    console.log('Documentos da coleção:', documents);
    const reply_markup = {
        force_reply: true,
        selective: true
    }
    bot.sendMessage(chatId, '*Please enter the admin password:*', { parse_mode: 'Markdown', reply_markup: reply_markup })
    bot.once('message', (msg) => {
        const adminPassword = process.env.ADMIN_PASSWORD
        if (adminPassword === msg.text) {
            bot.sendMessage(chatId, '*Admin autorizado com sucesso!*\nDigite a mensagem de atualização abaixo que deseja enviar para os usuários.', { parse_mode: 'Markdown' })
            
        } else {
            bot.sendMessage(chatId, '*Senha incorreta!*', { parse_mode: 'Markdown' })
        }
    })
}

module.exports = {
    userUpdates
}


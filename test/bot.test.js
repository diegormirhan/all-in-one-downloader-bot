require('dotenv').config()
const telegramBot = require('node-telegram-bot-api');
const { expect } = require('chai')

const path = require('path');
const requireAll = require('require-all');


// Importing all handlers
const folderPath = path.join(__dirname, '../handlers');
const handlers = requireAll({ dirname: folderPath });
console.log(handlers['instagram'])

// Substitua 'SEU_TOKEN' pelo token do seu bot obtido do BotFather no Telegram.
const token = process.env.TELEGRAM_API;

// Crie um objeto bot com o token
const bot = new telegramBot(token, { polling: true });

// Lidando com comandos ou mensagens
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Criação do teclado inline personalizado
  const inlineKeyboard = [
    [
      { text: 'Botão 1', callback_data: 'button_1' },
      { text: 'Botão 2', callback_data: 'button_2' },
    ],
  ];

  const options = {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  };

  // Envia uma mensagem com o teclado inline personalizado
  bot.sendMessage(chatId, 'Escolha uma opção:', options);
});

// Lidando com as ações de clique nos botões inline

bot.on('message', async function (msg) {
    const jsonResponse = await scrapper(msg.text)
    const chatId = msg.chat.id
    bot.sendMessage(chatId, handlers['instagram'].handle(bot, chatId, jsonResponse))
    console.log(jsonResponse);
})

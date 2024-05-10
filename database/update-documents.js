
/*
const { MongoClient } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');

// Configuração do MongoDB
const uri = "YOUR_MONGODB_URI";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'YOUR_DATABASE_NAME';
const collectionName = 'YOUR_COLLECTION_NAME';

// Configuração do Bot Telegram
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

async function updateDocuments() {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Buscar todos os documentos
        const documents = await collection.find({}).toArray();

        for (const doc of documents) {
            // Pega dados do usuário via API do Telegram
            const chatId = doc.id;
            const chatInfo = await bot.getChat(chatId);

            // Atualiza o documento
            const updateDoc = {
                $set: {
                    username: doc.username, // Mantém o mesmo
                    first_name: chatInfo.first_name, // Novo campo
                    lang: chatInfo.language_code || 'pt-br', // Pega do chat ou define 'pt-br' como padrão
                    usage: 0 // Define usage como 0
                }
            };

            const result = await collection.updateOne({ id: chatId }, updateDoc);
            console.log(`Documento com id ${chatId} atualizado com sucesso.`);
        }
    } catch (error) {
        console.error("Erro ao atualizar documentos:", error);
    } finally {
        await client.close();
    }
}

updateDocuments();
*/


const { idCollection } = require('../database/mongodb')
const { bot } = require('../src/telegram')

async function updateDocuments () {
    // Buscar todos os documentos
    const documents = await idCollection.find({}).toArray();

    for (doc of documents) {
        // Pega dados do usuário
        // verify if usage exists
        if (!doc.usage) {
            const chatId = doc.id
            const chatInfo = await bot.getChat(chatId)
            // Atualiza o documento
            const updateDoc = {
                $set: {
                    username: chatInfo.username, // Mantém o mesmo
                    first_name: chatInfo.first_name, // Novo campo
                    lang: 'unknown', // Pega do chat ou define 'pt-br' como padrão
                    usage: 0, // Define usage como 0
                    subscribed: false
                }
            };

            await idCollection.updateOne({ id: chatId }, updateDoc);
            console.log(`Documento com id ${chatId} atualizado com sucesso.`);
        }
    }
}

updateDocuments()



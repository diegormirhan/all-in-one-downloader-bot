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



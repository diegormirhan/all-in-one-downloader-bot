const { idCollection } = require('../database/mongodb')

/**
 * Retrieves the user ID associated with the given chat ID.
 *
 * @param {string} chatId - The ID of the chat.
 * @return {Promise} A Promise that resolves to the user ID.
 */
const getUserID = async (msg, chatId) => {
    try {
        const formattedDate = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            timeZoneName: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        const doc = {
            id: chatId,
            username: msg.from.first_name,
            cratedAt: formattedDate
        }

        const existingDoc = await idCollection.findOne({id: chatId});

        if (!existingDoc) {
            const result = await idCollection.insertOne(doc)
            console.log(`A document was inserted with the _id: ${result.insertedId}`)
        } else {
            console.log('The chatID is already on the database')
        }
    }  catch(error) {
        console.log('There was an erro trying to insert the chat Id into the database.\nError Message:', error);
    }
}

module.exports = getUserID
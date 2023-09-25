require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DATABASE_URL

const client = new MongoClient(uri);

async function runMongoDb(chatId) {
    try {
        const database = client.db('chatId');
        const coll = database.collection('Chat Id Collection')

        const doc = {
            id: chatId
        }

        const existingDoc = await coll.findOne({id: chatId});

        if (!existingDoc) {
            const result = await coll.insertOne(doc)
            console.log(`A document was inserted with the _id: ${result.insertedId}`)
        } else {
            console.log('The chatID is already on the database')
        }
    }  catch(error) {
        console.log('There was an erro trying to insert the chat Id into the database.\nError Message:', error);
    }
}

module.exports = runMongoDb
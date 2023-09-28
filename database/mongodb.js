require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DATABASE_URL
const client = new MongoClient(uri);
const idDatabase = client.db('chatId');
const idCollection = idDatabase.collection('Chat Id Collection')

module.exports = {
    client,
    idDatabase,
    idCollection
}
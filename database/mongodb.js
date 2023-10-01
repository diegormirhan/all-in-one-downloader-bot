require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

// Getting the database URL
const uri = process.env.DATABASE_URL
// Connecting to the MongoDB
const client = new MongoClient(uri);
// Connecting to the chatId database
const idDatabase = client.db('chatId');
// Connecting to the Chat Id Collection
const idCollection = idDatabase.collection('Chat Id Collection')

module.exports = {
    client,
    idDatabase,
    idCollection
}
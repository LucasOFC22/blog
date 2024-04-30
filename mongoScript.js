// mongoScript.js

// Importe o módulo MongoDB
const { MongoClient } = require('mongodb');

// URL de conexão com o servidor MongoDB
const uri = 'mongodb+srv://teste:1111@cluster0.lmhkta4.mongodb.net/';

// Nome do banco de dados
const dbName = 'blogDB';

// Função para inserir um novo usuário
async function insertUser(username, password) {
    const client = new MongoClient(uri);

    try {
        // Conecte-se ao servidor MongoDB
        await client.connect();

        // Acesse o banco de dados
        const db = client.db(dbName);

        // Acesse a coleção de usuários
        const usersCollection = db.collection('users');

        // Insira um novo documento de usuário
        const result = await usersCollection.insertOne({ username, password });
        console.log(`Usuário inserido com o ID: ${result.insertedId}`);
    } finally {
        // Feche a conexão com o cliente MongoDB
        await client.close();
    }
}

// Chame a função para inserir um novo usuário
insertUser('Lucas', '11');

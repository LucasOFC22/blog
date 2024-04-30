// Importe o módulo MongoDB
const { MongoClient } = require('mongodb');

// URL de conexão com o servidor MongoDB
const uri = 'mongodb+srv://teste:1111@cluster0.lmhkta4.mongodb.net/';

// Nome do banco de dados
const dbName = 'blogDB';

async function loginUser(username, password) {
    const client = new MongoClient(uri);

    try {
        // Conecte-se ao servidor MongoDB
        await client.connect();

        // Acesse o banco de dados
        const db = client.db(dbName);

        // Acesse a coleção de usuários
        const usersCollection = db.collection('users');

        // Pesquise o usuário pelo nome de usuário e senha
        const user = await usersCollection.findOne({ username, password });

        if (user) {
            alert('Login bem-sucedido!');
        } else {
            alert('Usuário ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique o console para mais detalhes.');
    } finally {
        // Feche a conexão com o cliente MongoDB
        await client.close();
    }
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await loginUser(username, password);
});

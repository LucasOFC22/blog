const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://teste:1111@cluster0.lmhkta4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para analisar o corpo das solicitações
app.use(bodyParser.json());

// Endpoint para lidar com solicitações de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Verificar se o usuário existe no banco de dados
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).send('Login bem-sucedido!');
        } else {
            res.status(401).send('Usuário ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login. Verifique o console para mais detalhes.');
    }
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

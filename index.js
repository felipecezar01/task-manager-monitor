require('dotenv').config();
const express = require('express');
const app = express();
const { initializeDatabase } = require('./src/db/db');  // Importa a função de inicialização do banco

// Middleware para parsear JSON
app.use(express.json());

// Inicializa o banco de dados (executa a criação da tabela)
initializeDatabase();

// Rotas principais
app.use('/api/tasks', require('./src/routes/tasks'));

// Configuração do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

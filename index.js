require('dotenv').config();
const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rotas principais (ainda vamos configurar as rotas específicas)
app.use('/api/tasks', require('./src/routes/tasks'));

// Configuração do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Conectado ao banco de dados PostgreSQL');
});

// Função para inicializar a tabela de tarefas
const initializeDatabase = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            status VARCHAR(20) DEFAULT 'a fazer',
            priority VARCHAR(20) DEFAULT 'média',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deadline TIMESTAMP
        );
    `;

    try {
        await pool.query(queryText);
        console.log("Tabela 'tasks' verificada/criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar a tabela 'tasks':", error);
    }
};

// Exporta a pool e a função de inicialização
module.exports = {
    query: (text, params) => pool.query(text, params),
    initializeDatabase,
};

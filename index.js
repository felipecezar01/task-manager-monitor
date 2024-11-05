require('dotenv').config();
const express = require('express');
const client = require('prom-client'); // Importa o prom-client para Prometheus
const app = express();
const { initializeDatabase } = require('./src/db/db');  // Importa a função de inicialização do banco

// Middleware para parsear JSON
app.use(express.json());

// Inicializa o banco de dados (executa a criação da tabela)
initializeDatabase();

// Configuração do prom-client para coletar métricas padrão
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();  // Coleta métricas padrão (uso de CPU, memória, etc.)

// Contador para rastrear o total de requisições HTTP
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total de requisições HTTP recebidas',
    labelNames: ['method', 'route', 'status'],
});

// Middleware para contar cada requisição HTTP
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.labels(req.method, req.path, res.statusCode.toString()).inc();
    });
    next();
});

// Endpoint para expor as métricas do Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Rotas principais
app.use('/api/tasks', require('./src/routes/tasks'));

// Configuração do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

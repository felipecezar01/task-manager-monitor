const express = require('express');
const router = express.Router();

// Rota básica para teste
router.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema de gestão de tarefas!');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Endpoint para criar uma nova tarefa
router.post('/', taskController.createTask);

// Endpoint para listar todas as tarefas
router.get('/', taskController.getAllTasks);

// Endpoint para obter uma tarefa específica pelo ID
router.get('/:id', taskController.getTaskById);

// Endpoint para atualizar uma tarefa pelo ID
router.put('/:id', taskController.updateTask);

// Endpoint para excluir uma tarefa pelo ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;

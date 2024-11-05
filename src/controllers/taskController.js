const db = require('../db/db');

// Criar uma nova tarefa
// src/controllers/taskController.js

exports.createTask = async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO tasks (title, description, status, priority, deadline) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, description, status || 'a fazer', priority || 'média', deadline]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao criar a tarefa:", error);  // Log do erro
        res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
};


// Listar todas as tarefas
exports.getAllTasks = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar as tarefas" });
    }
};

// Obter uma tarefa específica pelo ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar a tarefa" });
    }
};

// Atualizar uma tarefa pelo ID
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, deadline } = req.body;
    try {
        const result = await db.query(
            `UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, deadline = $5 
            WHERE id = $6 RETURNING *`,
            [title, description, status, priority, deadline, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
};

// Excluir uma tarefa pelo ID
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
        res.status(200).json({ message: "Tarefa excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir a tarefa" });
    }
};
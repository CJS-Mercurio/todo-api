const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')

// todo routes
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
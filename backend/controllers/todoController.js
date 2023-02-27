const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')

// @route GET /api/todos
// @desc get todos
const getTodos = asyncHandler(async (req, res) => {
  const todo = await Todo.find()

  res.status(200).json(todo)
})

// @route POST /api/todos
// @desc create todo
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a name field')
  }

  const todo = await Todo.create({
    name: req.body.name,
    description: req.body.description,
    isCompleted: req.body.isCompleted
  })

  res.status(201).json(todo)
})

// @route PUT /api/todos/:id
// @desc update todo
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todo, req.body, { new: true })

  res.status(200).json(updatedTodo);
})

// @route DELETE /api/todos/:id
// @desc delete todo
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  await todo.remove()

  res.status(200).json({ 
    id: req.params.id,
    message: 'Todo removed successfully.' });
})

// export functions
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}
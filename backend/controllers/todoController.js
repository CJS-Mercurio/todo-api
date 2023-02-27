const asyncHandler = require('express-async-handler')

// @route GET /api/todos
// @desc get todos
const getTodos = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get todos' })
})

// @route POST /api/todos
// @desc create todo
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a name field')
  }
  res.status(201).json({ message: 'Create todo' })
})

// @route PUT /api/todos/:id
// @desc update todo
const updateTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update todo ${req.params.id}` });
})

// @route DELETE /api/todos/:id
// @desc delete todo
const deleteTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete todo ${req.params.id}` });
})

// export functions
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}
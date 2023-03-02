const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')
const User = require('../models/userModel')

// @route GET /api/todos
// @desc get todos
const getTodos = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.user.id })
  res.status(200).json(todo)
})

// @route POST /api/todos
// @desc create todo
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a name field');
  }

  const todo = await Todo.create({
    name: req.body.name,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
    user: req.user.id
  })

  res.status(201).json(todo)
})

// @route PUT /api/todos/:id
// @desc update todo
const updateTodo = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const todo = await Todo.findById(id);
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    res.status(400)
    throw new Error('Todo not found.');
  }
  
  if (!req.user) {
    res.status(400)
    throw new Error("User not found.");
  }
  
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todo, req.body, { new: true });

  res.status(200).json({
    message: "Todo updated successfully.",
    todo: updatedTodo
  });
})

// @route DELETE /api/todos/:id
// @desc delete todo
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  
  if (!req.user) {
    res.status(400)
    throw new Error("User not found.");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401) 
    throw new Error("User not authorized.");
  }

  await todo.remove()

  res.status(200).json({ 
    message: 'Todo removed successfully.',
    id: req.params.id
  });
})

// export functions
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}
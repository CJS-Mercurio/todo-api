const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

// initialize express
const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// error handler middleware
app.use(errorHandler);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
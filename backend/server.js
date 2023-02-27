const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const todoRoutes = require('./routes/todoRoutes');

// initialize express
const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// routes
app.use('/api/todos', todoRoutes);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
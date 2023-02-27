const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const {errorHandler} = require('./middleware/errorMiddleware')
const todoRoutes = require('./routes/todoRoutes')

// initialize express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/todos', todoRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
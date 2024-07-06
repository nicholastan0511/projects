const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const todoRouter = require('./controllers/todoRouter')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const path = require('path')
const url = process.env.MONGODB_URI

console.log(url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB')
  })

app.use(express.static('dist'))
// Handle all other requests by serving the index.html from 'dist'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(express.json())
app.use(cors())
app.use(middleware.tokenExtractor)

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/todos', todoRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
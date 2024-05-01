const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const todoRouter = require('./controllers/todoRouter')
const url = process.env.MONGODB_URI

console.log(url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

app.use(express.json())
app.use(cors())

app.use('/api/todos', todoRouter)

module.exports = app
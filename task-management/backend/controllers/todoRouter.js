const todoRouter = require('express').Router()
const Todo = require('../models/todo')
const mongoose = require('mongoose')

todoRouter.get('/', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

todoRouter.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  res.json(todo)
  mongoose.connection.close()
})

todoRouter.post('/', async (req, res) => {
  const body = req.body
  console.log(body)
  const todo = new Todo({
    title: body.title,
    deadline: body.deadline,
    favorite: body.favorite,
    done: body.done
  })

  const savedTodo = await todo.save()
  res.json(savedTodo)
})

todoRouter.put('/:id', async(req, res) => {
  const todo = await Todo.findById(req.params.id)
  console.log(req.body)
  console.log(todo)

  //check if the request is to alter favorite
  if (req.body.favorite) {
    if (todo.favorite == 'true')
      todo.favorite = 'false'
    else 
      todo.favorite = 'true'
    

    const savedTodo = await todo.save()
    res.json(savedTodo)
  //check if the request is to alter done
  } else if (req.body.done) {
    todo.done = !todo.done

    const savedTodo = await todo.save()
    res.json(savedTodo)
  }
})

module.exports = todoRouter
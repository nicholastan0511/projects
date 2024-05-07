const todoRouter = require('express').Router()
const Todo = require('../models/todo')
const mongoose = require('mongoose')
const middleware = require('../utils/middleware')

todoRouter.get('/', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

todoRouter.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  res.json(todo)
  mongoose.connection.close()
})

todoRouter.post('/', middleware.userExtractor, async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    console.log(body)
    console.log(user)
    const todo = new Todo({
      title: body.title,
      deadline: body.deadline,
      favorite: body.favorite,
      done: body.done,
      user: req.user.id
    })

    const savedTodo = await todo.save()

    //update user's todos
    req.user.todos = req.user.todos.concat(savedTodo._id)
    await req.user.save()

    res.status(201).json(savedTodo)

  } catch (err) {
    console.log('im not skipped')
    next(err)
  }
})

todoRouter.put('/:id', middleware.userExtractor, async(req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!req.user.id.toString() === todo.user.id.toString())
    return res.status(401).json({ error: 'invalid user' })

  //check if the request is to alter favorite
  if (req.body.favorite) {
    if (todo.favorite == 'true')
      todo.favorite = 'false'
    else 
      todo.favorite = 'true'
    

    const savedTodo = await todo.save()
    res.status(200).json(savedTodo)
  //check if the request is to alter done
  } else if (req.body.done) {
    if (todo.done == 'true') 
      todo.done = 'false'
    else 
      todo.done = 'true'

    const savedTodo = await todo.save()
    res.status(200).json(savedTodo)
  }
})

todoRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!req.user.id.toString() === todo.user.id.toString())
    return res.status(401).json({ error: 'invalid user' })

  await Todo.deleteOne({ _id: todo._id })

  res.status(204).end()
})

module.exports = todoRouter
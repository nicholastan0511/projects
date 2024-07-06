const todoRouter = require('express').Router()
const Todo = require('../models/todo')
const mongoose = require('mongoose')
const middleware = require('../utils/middleware')

todoRouter.get('/', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

todoRouter.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id)
    res.json(todo)
    mongoose.connection.close()
  } catch (err) {
    next(err)
  }
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

todoRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async(req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // check if todo exists
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(req.user.id.toString())
    console.log(todo.user.toString())

    // check if the client is the user that registers the said todo
    if (req.user.id.toString() !== todo.user.toString()) {
      return res.status(401).json({ error: 'invalid user' });
    }


    let updated = false;

    if ('favorite' in req.body) {
      todo.favorite = todo.favorite === 'true' ? 'false' : 'true';
      updated = true;
    }

    if ('done' in req.body) {
      todo.done = todo.done === 'true' ? 'false' : 'true';
      updated = true;
    }

    if ('deadline' in req.body) {
      if (todo.deadline !== req.body.deadline) {
        todo.deadline = req.body.deadline;
        updated = true;
      }
    }

    if ('title' in req.body) {
      if (todo.title !== req.body.title) {
        todo.title = req.body.title;
        updated = true;
      }
    }

    if ('pomodoro' in req.body) {
      console.log(req.body.pomodoro)

      todo.pomodoro = req.body.pomodoro;
      updated = true;
    }

    if (updated) {
      const savedTodo = await todo.save();
      return res.status(200).json(savedTodo);
    } else {
      console.log('sup bitch')

      return res.status(200).end();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
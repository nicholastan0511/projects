const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('todos', { title: 1, deadline: 1, favorite: 1, done: 1 })
  res.json(users)
})

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

userRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('todos', { title: 1, deadline: 1, favorite: 1, done: 1 })
  res.json(users)
})

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('todos', { title: 1, deadline: 1, favorite: 1, done: 1 })
    res.json(user)
  } catch (err) {
    next(err)
  }
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

  const userForToken = {
    username: savedUser.username,
    id: savedUser.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(201).json({token, ...userForToken })
})

module.exports = userRouter
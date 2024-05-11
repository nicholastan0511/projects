const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res, next) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log('IM CALLED')
  if (error.name === 'ValidationError') 
    return res.status(400).json({ error: error.message })
  else if (error.name === 'CastError')
    return res.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'JsonWebTokenError')
    return res.status(401).json({ error: error.message })
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else
    req.token = null
    
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }


  req.user = await User.findById(decodedToken.id)

  next()
}
  
module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }
const unknownEndpoint = (req, res, next) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log('IM CALLED')
  if (error.name === 'ValidationError') 
    return res.status(400).json({ error: error.message })
  else if (error.name === 'CastError')
    return res.status(400).send({ error: 'malformatted id' })
  else
    next(error)
}
  
module.exports = { unknownEndpoint, errorHandler }
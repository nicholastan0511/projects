const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    required: true
  },
  deadline: {
    type: String,
    minLength: 5,
    required: true
  },
  favorite: {
    type: String,
    required: true
  },
  done: {
    type: String,
    required: true
  },
  pomodoro: {
    type: Number,
    required: false
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Todo', todoSchema)
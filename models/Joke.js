const mongoose = require('mongoose')

const JokeSchema = new mongoose.Schema({
  setup: {
    type: String,
    required: false,
  },
  punchline: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Joke', JokeSchema)

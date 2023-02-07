const mongoose = require('mongoose')

const JokeSchema = new mongoose.Schema({
  setup: {
    type: String,
    required: false,
    trim: true,
  },
  punchline: {
    type: String,
    required: true,
    trim: true,
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
  },
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Joke', JokeSchema)

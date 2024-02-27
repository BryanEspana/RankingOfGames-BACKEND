const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Games', // Esto referencia al modelo Game
        required: true
      },
    title: String,
    rating: Number,
    description: String,
    respuestas: [{
      user: { type: String, default: "anonimo" },
      respuesta: String
  }]
});


const Comments = mongoose.model('Comments', CommentsSchema, 'Comments');

module.exports = Comments;

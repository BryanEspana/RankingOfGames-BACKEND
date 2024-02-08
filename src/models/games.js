const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  genres:[{
    name:String
  }]
});


const Games = mongoose.model('Games', GamesSchema);

module.exports = Games;

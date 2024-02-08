const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
  name: String
});

const Game = mongoose.model('Game', GamesSchema);

module.exports = Game;

//Traer juegos
const Games = require('../models/games')

//Top 10 mejores juegos en general
exports.findTopGames = async (req, res) => {
  try{
    const topGames = await Games.find(
      {},
      {"name":1, "rating":1, "_id":1},)
      .sort({"rating":-1})
      .limit(10);
    res.json(topGames);
    console.log("TOP",topGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};


//Top 10 mejores juegos de acción
exports.findTopActionGames = async (req, res) => {
  try{
    const topActionGames = await Games.find(
        {"genres.name": "Action"},
        {"name":1, "rating":1, "_id":1},)
      .sort({"rating":-1})
      .limit(10);
    res.json(topActionGames);
    console.log("TOPACCION",topActionGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};
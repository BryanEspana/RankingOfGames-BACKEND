//Traer juegos
const Games = require('../models/games')

exports.findTopActionGames = async (req, res) => {
  try{
    const topActionGames = await Games.find(
        {"genres.name": "Action"},
        {"name":1, "rating":1, "_id":1}
        )
      .sort({"rating":-1})
      .limit(10);
    res.json(topActionGames);
    console.log("TOPACCION",topActionGames)

  } catch (err) {
    res.status(500).send(error.message);
  }
};
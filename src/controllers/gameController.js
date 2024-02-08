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

//Top 10 mejores juegos de aventura
exports.findTopAdventureGames = async (req, res) => {
  try{
    const topAdventureGames = await Games.find(
        {"genres.name": "Adventure"},
        {"name":1, "rating":1, "_id":1},)
      .sort({"rating":-1})
      .limit(10);
    res.json(topAdventureGames);
    console.log("TOPAVENTURA",topAdventureGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de shooters
exports.findTopShooterGames = async (req, res) => {
  try{
    const topShooterGames = await Games.find(
        {"genres.name": "Shooter"},
        {"name":1, "rating":1, "_id":1},)
      .sort({"rating":-1})
      .limit(10);
    res.json(topShooterGames);
    console.log("TOPSHOOTER",topShooterGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de sports
exports.findTopSportsGames = async (req, res) => {
  try{
    const topSportsGames = await Games.find(
        {"genres.name": "Sports"},
        {"name":1, "rating":1, "_id":1},)
      .sort({"rating":-1})
      .limit(10);
    res.json(topSportsGames);
    console.log("TOPSPORTS",topSportsGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de Arcade
exports.findTopArcadeGames = async (req, res) => {
  try{
    const topArcadeGames = await Games.find(
        {"genres.name": "Arcade"},
        {"name":1, "rating":1, "_id":1},)
      .sort({"rating":-1})
      .limit(10);
    res.json(topArcadeGames);
    console.log("TOPARCADE",topArcadeGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};
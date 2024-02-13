//Traer juegos
const Games = require('../models/games')

//Top 10 mejores juegos en general
exports.findTopGames = async (req, res) => {
  try{
    const topGames = await Games.find({}, { "name": 1, "released": 1, "background_image": 1, "rating": 1, "genres.name": 1, "_id": 0 })
    .sort({ "rating": -1 })
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
    const topActionGames = await Games.aggregate([
      { 
        $match: { "genres.name": "Action" }
      },
      { 
        $project: {
          "name": 1,
          "released": 1,
          "background_image": 1,
          "rating": 1,
          "genre": "$genres.name",
          "_id": 0
        }
      },
      { 
        $sort: { "rating": -1 }
      },
      {
        $limit: 10
      }
    ]);
    res.json(topActionGames);
    console.log("TOPACCION",topActionGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de aventura
exports.findTopAdventureGames = async (req, res) => {
  try{
    const topAdventureGames = await Games.aggregate([
      { 
        $match: { "genres.name": "Adventure" }
      },
      { 
        $project: {
          "name": 1,
          "released": 1,
          "background_image": 1,
          "rating": 1,
          "genre": "$genres.name",
          "_id": 0
        }
      },
      { 
        $sort: { "rating": -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    res.json(topAdventureGames);
    console.log("TOPAVENTURA",topAdventureGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de shooters
exports.findTopShooterGames = async (req, res) => {
  try{
    const topShooterGames = await Games.aggregate([
      { 
        $match: { "genres.name": "Shooter" }
      },
      { 
        $project: {
          "name": 1,
          "released": 1,
          "background_image": 1,
          "rating": 1,
          "genre": "$genres.name",
          "_id": 0
        }
      },
      { 
        $sort: { "rating": -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    res.json(topShooterGames);
    console.log("TOPSHOOTER",topShooterGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de sports
exports.findTopSportsGames = async (req, res) => {
  try{
    const topSportsGames = await Games.aggregate([
      { 
        $match: { "genres.name": "Sports" }
      },
      { 
        $project: {
          "name": 1,
          "released": 1,
          "background_image": 1,
          "rating": 1,
          "genre": "$genres.name",
          "_id": 0
        }
      },
      { 
        $sort: { "rating": -1 }
      },
      {
        $limit: 10
      }
    ]);
    res.json(topSportsGames);
    console.log("TOPSPORTS",topSportsGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top 10 mejores juegos de Arcade
exports.findTopArcadeGames = async (req, res) => {
  try{
    const topArcadeGames = await Games.aggregate([
      { 
        $match: { "genres.name": "Arcade" }
      },
      { 
        $project: {
          "name": 1,
          "released": 1,
          "background_image": 1,
          "rating": 1,
          "genre": "$genres.name",
          "_id": 0
        }
      },
      { 
        $sort: { "rating": -1 }
      },
      {
        $limit: 10
      }
    ]);
    res.json(topArcadeGames);
    console.log("TOPARCADE",topArcadeGames)

  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Top los mejores generos segun el promedio de sus ratings:
exports.findTopGenresAcordingAVGRating =async (req, res) => {
  try{
    const topGenresAccordingAVGRate = await Games.aggregate([ { $unwind: "$genres" },{ $group: { _id: "$genres.name", avgRating: { $avg: "$rating" } } }, { $sort: { avgRating: -1 } }]);
    res.json(topGenresAccordingAVGRate);
    console.log("TOPGENRESACORDINGAVGRATING",topGenresAccordingAVGRate);
  }catch(err){
    res.status(500).send(err.message);
  }
};

//los mejores generos segun metacritic:
exports.findTopGenresAccordingMetacritic = async (req, res) => {
  try{
    const topGenresAccordingMetacritic = await Games.aggregate([
      { $unwind: "$genres" }, 
      { 
        $group: { 
          _id: "$genres.name", 
          avgMetacritic: { $avg: "$metacritic" }     } 
      },
      { $sort: { avgMetacritic: -1 } } ]);
    res.json(topGenresAccordingMetacritic);
    console.log("TOPGENRESACORDINGMETACRITIC",topGenresAccordingMetacritic);
    
  }catch(err){
    res.status(500).send(err.message);
  }
};

//Las plataformas con más juegos:
exports.findPlatformsGames = async (req,res) =>{
  try{
    const PlatformGames = await Games.aggregate([
      { $unwind: "$platforms" },   { 
        $group: { 
          _id: "$platforms.platform.name", 
          count: { $sum: 1 }     } 
      },
      { $sort: { count: -1 } } ]);
      res.json(PlatformGames);
      console.log("PLATFORMGAMES",PlatformGames );
  }
  catch(err){
    res.status(500).send(err, message);
  }
};

//Los 10 mejores juegos más recientes:
exports.findRecentGames = async (req,res) =>{
  try{
    const RecentGames = await Games.find({}, {"name":1, "released":1, "rating":1, "background_image":1, "genre": "$genres.name", "_id":0})
    .sort({"released": -1, "rating":-1})
    .limit(10);  
    res.json(RecentGames);
    console.log("RECENTGAMES", RecentGames);
  }catch(err){
    res.status(500).send(err,message);
  }
};

//Los 10 peores juegos: excluyendo los que tienen 0 en rating
exports.findWorstGames = async(req,res)=>{
  try{
    const WorstGames = await Games.find({ "rating": { $ne: 0 } }, { "name": 1, "released": 1, "rating": 1, "background_image": 1, "genre": "$genres.name", "_id": 0 })
    .sort({"rating": 1})
    .limit(10);
    res.json(WorstGames);
    console.log("WORSTGAMES", WorstGames );
  }catch(err){
    res.status(500).send(err,message);
  }
};
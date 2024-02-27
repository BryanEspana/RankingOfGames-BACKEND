//Traer juegos
const Games = require('../models/games')

//Top 10 mejores juegos en general
exports.findTopGames = async (req, res) => {
  try{
    const topGames = await Games.find({}, { "name": 1, "released": 1, "background_image": 1, "rating": 1, "genres.name": 1, "_id": 1 })
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
          "_id": 1
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
          "_id": 1
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
          "_id": 1
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
          "_id": 1
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
          "_id": 1
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
    const RecentGames = await Games.find({}, {"name":1, "released":1, "rating":1, "background_image":1, "genre": "$genres.name", "_id":1})
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
    const WorstGames = await Games.find({ "rating": { $ne: 0 } }, { "name": 1, "released": 1, "rating": 1, "background_image": 1, "genre": "$genres.name", "_id": 1 })
    .sort({"rating": 1})
    .limit(10);
    res.json(WorstGames);
    console.log("WORSTGAMES", WorstGames );
  }catch(err){
    res.status(500).send(err,message);
  }
};

//Generos más jugados
exports.findTopPlayedGenres = async(req,res)=>{
  try{
    const TopPlayedGenres = await Games.aggregate([
      {
        $unwind: "$genres" 
      },
      {
        $group: {
          _id: "$genres.name", 
          totalPlaytime: { $sum: "$playtime" } 
        }
      },
      {
        $sort: { totalPlaytime: -1 } 
      },
      {
        $limit: 10 
      }
    ]);
    res.json(TopPlayedGenres);
    console.log("TOPPLAYEDGENRES", TopPlayedGenres );
  }catch(err){
    res.status(500).send(err,message);
  }
};

//juegos más jugados
exports.findTopPlayedGames = async(req,res)=>{
  try{
    const TopPlayedGames = await Games.aggregate([
      {
        $group: {
          _id: "$_id", 
          name: { $first: "$name" }, 
          totalPlaytime: { $sum: "$playtime" },
          rating: { $first: "$rating" },
          released: { $first: "$released" },
          background_images: { $first: "$background_images" },
          genre: { $addToSet: "$genres.name" } 
        }
      },
      {
        $sort: { totalPlaytime: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    res.json(TopPlayedGames);
    console.log("TOPPLAYEDGAMES",TopPlayedGames); 
  }catch(err){
    res.status(500).send(err,message);
  }
};

//Top recent games
exports.findTopRecentGames = async(req,res)=>{
  try{
    const MostRecentGames= await Games.aggregate([
      {
        $sort: { "rating": -1, "released": -1 } 
      },
      {
        $project: {
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "_id": 1
        }
      },
      {
        $limit: 10 
      }
    ]);
    res.json(MostRecentGames);
    console.log("MOSTRECENTGAMES", MostRecentGames );
  }catch(err){
    res.status(500).send(err.message);
  }
};

//TRENDING
exports.findTrending = async(req,res)=>{
  try{
    const Trending = await Games.find({ "rating": { $gt: 4 }, "released": { $regex: /^2024/ } }, { "name": 1, "released": 1, "rating": 1, "background_image": 1, "genre": "$genres.name", "_id": 1 }).sort({ "released": -1, "rating": -1 }).limit(10);
    res.json(Trending);
    console.log("TRENDING", Trending);
  }catch(err){
    res.status(500).send(err,message);
  }
};

//GAME INFO
exports.findGameById = async (req, res) => {
  try {
    const gameId = req.params.id; 
    const gameInfo = await Games.findOne(
      { "_id": gameId },
      {
        "_id": 1,
        "name": 1,
        "rating": 1,
        "released": 1,
        "background_image": 1,
        "genres.name": 1,
        "platforms.platform": 1,
        "reviews_count": 1,
        "short_screenshots": 1,
        "ratings": 1,
        "stores": 1
      }
    );

    if (!gameInfo) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    res.json(gameInfo);
    console.log("Información del juego:", gameInfo);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Error en el servidor" });
  }
};


// Obtener juegos de la tienda Steam
exports.findSteamGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 1 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const steamGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 1 // Filtrar po  r el ID de la tienda Steam
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 1] } // Filtrar las tiendas y quedarse con la tienda Steam
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (steamGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda Steam" });
    }
    console.log("Cantidad de juegos encontrados para la tienda Steam:", steamGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: steamGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener juegos de la tienda xBOX STORE
exports.findXBOXGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 2 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const XBOXGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 2
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 2] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (XBOXGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda XBOX store" });
    }
    console.log("Cantidad de juegos encontrados para la tienda XBOX store:", XBOXGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: XBOXGames,
      totalPages: totalPages,
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Juegos de Playstation Store
exports.findPlayStationGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 3 });
  const totalPages = Math.ceil(totalGames / pageSize);
  const skip = (page - 1) * pageSize;

  try {
    const PlayStationGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 3
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 3] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (PlayStationGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda XBOX store" });
    }
    console.log("Cantidad de juegos encontrados para la tienda PlayStation store:", PlayStationGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: PlayStationGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};



//juegos gog store
exports.findGOGStoreGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 5 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const GOGGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 5
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 5] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (GOGGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda GOG" });
    }
    console.log("Cantidad de juegos encontrados para la tienda GOG:", GOGGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: GOGGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//App STORE
exports.findAppStoreGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 4 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const AppStoreGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 4
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 4] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (AppStoreGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda AppStore" });
    }
    console.log("Cantidad de juegos encontrados para la tienda AppStore:", AppStoreGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: AppStoreGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//juegos nintendo store
exports.findNintendoStoreGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 1 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const NintendoGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 6
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 6] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (NintendoGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda Nintendo" });
    }
    console.log("Cantidad de juegos encontrados para la tienda Nintendo:", NintendoGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: NintendoGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//xbox 360 store
exports.findXbox360Games = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 1 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const Xbox360Games = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 7
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 7] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (Xbox360Games.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda Xbox360" });
    }
    console.log("Cantidad de juegos encontrados para la tienda Xbox360:", Xbox360Games.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: Xbox360Games,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//GOOGLE PLAY STORE
exports.findGooglePlayGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 1 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const GooglePlayGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 8
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 8] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (GooglePlayGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda Google PlayStore" });
    }
    console.log("Cantidad de juegos encontrados para la tienda Google PlayStore:", GooglePlayGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: GooglePlayGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//ITCH STORE
exports.findITCHGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 1 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const ITCHGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 9
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 9] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (ITCHGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda ITCH Store" });
    }
    console.log("Cantidad de juegos encontrados para la tienda ITCH Store:", ITCHGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: ITCHGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//epic games store
exports.findEpicStooreGames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;
  const totalGames = await Games.countDocuments({ "stores.store.id": 1 });
  const totalPages = Math.ceil(totalGames / pageSize);

  const skip = (page - 1) * pageSize;
  try {
    const EpicGames = await Games.aggregate([
      {
        $match: {
          "stores.store.id": 11
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "rating": 1,
          "released": 1,
          "background_image": 1,
          "genres.name": 1,
          "platforms.platform": 1,
          "reviews_count": 1,
          "short_screenshots": 1,
          "ratings": 1,
          "stores": {
            $filter: {
              input: "$stores",
              as: "store",
              cond: { $eq: ["$$store.store.id", 11] } // Filtrar las tiendas y quedarse con la tienda 
            }
          }
        }
      },
      {$skip: skip},
      {$limit: pageSize}
    ]);

    if (EpicGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos para la tienda Epic Games" });
    }
    console.log("Cantidad de juegos encontrados para la tienda Epic Games:", EpicGames.length); // Imprimir la cantidad de juegos encontrados
    res.json({
      games: EpicGames,
      totalPages: totalPages
    });
    //console.log("Juegos de la tienda Steam:", steamGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
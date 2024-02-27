// routes/api.js
// Importa los controladores que necesitas
const gameController = require('../controllers/gameController');
const commentController = require('../controllers/commentController');
const storesController = require('../controllers/storesController');
const express = require('express');
const router = express.Router();


// Definir las rutas de la API
//Top 10 mejores juegos en general
router.get('/top-games', gameController.findTopGames);

//Top 10 juegos de acción
router.get('/top-action-games', gameController.findTopActionGames);

//Top 10 mejores juegos de aventura
router.get('/top-adventure-games', gameController.findTopAdventureGames);

//Top 10 mejores juegos de shooter
router.get('/top-shooter-games', gameController.findTopShooterGames);

//Top 10 mejores juegos de sports
router.get('/top-sports-games', gameController.findTopSportsGames);

//Top 10 mejores juegos de Arcade
router.get('/top-arcade-games', gameController.findTopArcadeGames);

//Top mejores generos segun el prmedio de sus ratings
router.get('/top-genres-avgrating', gameController.findTopGenresAcordingAVGRating);

//los mejores generos segun metacritic:
router.get('/top-genres-metacritic', gameController.findTopGenresAccordingMetacritic);

//Las plataformas con más juegos:
router.get("/platform-games", gameController.findPlatformsGames);

//Los 10 mejores juegos más recientes:
router.get('/recent-games',gameController.findRecentGames);

//Los 10 peores juegos: excluyendo los que tienen 0 en rating
router.get("/worst-games", gameController.findWorstGames);

//generos más jugados
router.get('/most-played-genres', gameController.findTopPlayedGenres);

//Juegos más jugados
router.get('/most-played-games', gameController.findTopPlayedGames);

//juegos tendencia
router.get('/top-recent-games', gameController.findTopRecentGames);

//Trending
router.get('/trending', gameController.findTrending);

//GAME INFO
router.get('/games/:id',gameController.findGameById);

// Ruta para obtener comentarios por gameId
router.post('/games/get-comments', commentController.getCommentsByGameId);

// Ruta para eliminar un comentario por su _id
router.delete('/games/comments/:comentarioId', commentController.deleteCommentById);

// Ruta para añadir comentarios a un juego
router.post('/games/add-comment', commentController.addComments);

// Ruta para actualizar un comentario específico por su _id
router.put('/games/update-comments', commentController.updateCommentById);

//Ruta para obtener la tienda por id
router.get('/stores/:id', storesController.getStoreById);

//Ruta para obtener todas las tiendas
router.get('/All-stores', storesController.getAllStores);

// Ruta para obtener los juegos de la tienda Steam
router.get('/stores/games/steam', gameController.findSteamGames);

// Ruta para obtener los juegos de la tienda XBOX Store
router.get('/stores/games/xbox-store', gameController.findXBOXGames);

// Ruta para obtener los juegos de la tienda Playstation Store
router.get('/stores/games/playstation-store', gameController.findPlayStationGames);

//Ruta para obtener los juegos de appstore
router.get('/stores/games/apple-appstore', gameController.findAppStoreGames);

//Ruta para obtener los juegos de GOG
router.get('/stores/games/gog', gameController.findGOGStoreGames);

//Ruta para obtener los juegos de Nintendo
router.get('/stores/games/nintendo', gameController.findNintendoStoreGames);

//router para obtener los juegos de zbox360
router.get('/stores/games/xbox360', gameController.findXbox360Games);

//ruta para obtener los juegos de google play
router.get('/stores/games/google-play', gameController.findGooglePlayGames);

//ruta para obtener los juegos de ITCH
router.get('/stores/games/itch', gameController.findITCHGames);

//ruta para obtener los juegos de epic games
router.get('/stores/games/epic-games', gameController.findEpicStooreGames);

// Ruta para agregar una respuesta a un comentario específico por su _id
router.post('/games/comments/add-response/:comentarioId', commentController.addResponseToComment);

// Ruta para eliminar una respuesta de un comentario por su _id y el _id de la respuesta
router.delete('/games/comments/:comentarioId/responses/:respuestaId', commentController.deleteResponseFromComment);

// Ruta para actualizar una respuesta de un comentario por su _id y el _id de la respuesta
router.put('/games/comments/:comentarioId/responses/:respuestaId', commentController.updateResponseFromComment);

// Ruta para obtener respuestas de un comentario por su _id
router.post('/games/comments/get-responses', commentController.getResponsesByCommentId);


// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;

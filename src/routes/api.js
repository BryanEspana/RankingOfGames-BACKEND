// routes/api.js
// Importa los controladores que necesitas
const gameController = require('../controllers/gameController');
const sampleController = require('../controllers/sampleController');

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

// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;

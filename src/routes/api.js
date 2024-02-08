// routes/api.js
// Importa los controladores que necesitas
const gameController = require('../controllers/gameController');
const sampleController = require('../controllers/sampleController');

const express = require('express');
const router = express.Router();


// Definir las rutas de la API
//Top 10 juegos de acción
router.get('/top-action-games', gameController.findTopActionGames);



// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;

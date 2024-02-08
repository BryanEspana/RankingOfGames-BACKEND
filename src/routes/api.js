// routes/api.js

const express = require('express');
const router = express.Router();

// Importa los controladores que necesitas
const sampleController = require('../controllers/sampleController');

// Definir las rutas de la API
router.get('/', sampleController.home);
router.get('/items', sampleController.listItems);
router.post('/items', sampleController.createItem);

// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;

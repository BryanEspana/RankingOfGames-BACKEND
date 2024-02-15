require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conectados a MongoDB");
});

app.use(cors()); // Usa el middleware CORS
// Middlewares
app.use(express.json()); // Para parsear JSON
// Rutas
app.use('/api', require('./routes/api')); // Importa las rutas de la API
// Manejo de errores
app.use((err, req, res, next) => {
  // Un simple manejo de errores como ejemplo
  res.status(500).send('Algo salió mal!');
});





module.exports = app;

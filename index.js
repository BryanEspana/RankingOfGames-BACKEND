const app = require('./src/app'); // Importa la configuración de Express desde app.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

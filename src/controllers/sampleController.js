// controllers/sampleController.js


// Un controlador de ejemplo para la ruta raíz
exports.home = (req, res) => {
    res.send('Bienvenido a la API');
  };
  
  // Un controlador de ejemplo para listar ítems
  exports.listItems = (req, res) => {
    // Aquí iría la lógica para recuperar y enviar ítems de la base de datos
    res.send('Lista de ítems');
  };
  
  // Un controlador de ejemplo para crear ítems
  exports.createItem = (req, res) => {
    // Aquí iría la lógica para crear un nuevo ítem en la base de datos
    res.send('Ítem creado');
  };
  
  
const Comments = require('../models/comments')

// Obtener comentarios por ID de juego
exports.getCommentsByGameId = async (req, res) => {
  try {
      // Obtén el gameId del cuerpo de la solicitud
      const { gameId } = req.body;
      console.log("GAMEID",gameId);

      // Busca todos los comentarios que coincidan con el gameId en la base de datos
      const comentarios = await Comments.find({ gameId });

      // Envía los comentarios encontrados como respuesta
      res.json(comentarios);
      console.log("COMENTARIOS",comentarios);
  } catch (error) {
      // Maneja los errores
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

// Eliminar comentario por _id
exports.deleteComments = async (req, res) => {
  try {
    const { _id } = req.body;

    // Busca y elimina el comentario por su _id
    const comentarioEliminado = await Comments.findByIdAndDelete(_id);

    if (!comentarioEliminado) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
};

// Agregar un nuevo comentario a un juego específico
exports.addComments = async (req, res) => {
  try {
    const { title, rating, description } = req.body;
    const gameId = req.params.gameId; // Obtiene el gameId de los parámetros de la URL

    // Crea un nuevo comentario asociado al gameId del juego
    const nuevoComentario = new Comments({
      gameId,
      title,
      rating,
      description
    });

    // Guarda el comentario en la base de datos
    await nuevoComentario.save();

    res.json({ mensaje: 'Comentario agregado correctamente', comentario: nuevoComentario });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
};

// Controlador para actualizar un comentario por su _id
exports.updateCommentById = async (req, res) => {
  try {
      const commentId = req.params.id;
      const { title, rating, description } = req.body;

      // Buscar el comentario por su _id y actualizarlo
      const updatedComment = await Comments.findByIdAndUpdate(commentId, { title, rating, description }, { new: true });

      if (!updatedComment) {
          return res.status(404).json({ message: "Comentario no encontrado" });
      }

      res.status(200).json(updatedComment);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send({ error: "Error en el servidor" });
  }
};

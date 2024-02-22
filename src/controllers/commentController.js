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

// Eliminar comentario por su _id
exports.deleteCommentById = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId; // Obtiene el comentarioId de los parámetros de la URL

    // Busca y elimina el comentario por su _id
    const comentarioEliminado = await Comments.findByIdAndDelete(comentarioId);

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
    const { gameId, title, rating, description } = req.body;

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


// Actualizar un comentario existente por su _id
exports.updateCommentById = async (req, res) => {
  try {
    const { _id, title, rating, description } = req.body;

    // Busca el comentario por su _id en la base de datos
    let comentario = await Comments.findById(_id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    // Actualiza los campos del comentario con los nuevos valores
    comentario.title = title;
    comentario.rating = rating;
    comentario.description = description;

    // Guarda el comentario actualizado en la base de datos
    await comentario.save();

    res.json({ mensaje: 'Comentario actualizado correctamente', comentario });
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    res.status(500).json({ error: 'Error al actualizar comentario' });
  }
};

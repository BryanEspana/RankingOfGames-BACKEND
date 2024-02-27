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

// Agregar una respuesta a un comentario específico por su _id
exports.addResponseToComment = async (req, res) => {
  try {
      const { comentarioId } = req.params;
      const { respuesta } = req.body;

      const comentario = await Comments.findById(comentarioId);

      if (!comentario) {
          return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      comentario.respuestas.push({ user: "anonimo", respuesta });
      await comentario.save();

      res.json({ mensaje: 'Respuesta agregada correctamente', comentario });
  } catch (error) {
      console.error('Error al agregar respuesta:', error);
      res.status(500).json({ error: 'Error al agregar respuesta' });
  }
};

// Eliminar una respuesta de un comentario por su _id y el _id de la respuesta
exports.deleteResponseFromComment = async (req, res) => {
  try {
      const { comentarioId, respuestaId } = req.params;

      const comentario = await Comments.findById(comentarioId);

      if (!comentario) {
          return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      if (!Array.isArray(comentario.respuestas)) {
          return res.status(400).json({ error: 'El campo respuestas no es un array' });
      }

      comentario.respuestas = comentario.respuestas.filter(respuesta => respuesta._id.toString() !== respuestaId);
      await comentario.save();

      res.json({ mensaje: 'Respuesta eliminada correctamente', comentario });
  } catch (error) {
      console.error('Error al eliminar respuesta:', error);
      console.log("ERROR",error)
      res.status(500).json({ error: 'Error al eliminar respuesta' });
  }
};

// Actualizar una respuesta de un comentario por su _id y el _id de la respuesta
exports.updateResponseFromComment = async (req, res) => {
  try {
    const { comentarioId, respuestaId } = req.params;
    const { respuesta } = req.body;

    const comentario = await Comments.findById(comentarioId);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    const respuestaToUpdate = comentario.respuestas.id(respuestaId);
    if (!respuestaToUpdate) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    respuestaToUpdate.respuesta = respuesta;

    await comentario.save();

    res.json({ mensaje: 'Respuesta actualizada correctamente', comentario });
  } catch (error) {
    console.error('Error al actualizar respuesta:', error);
    res.status(500).json({ error: 'Error al actualizar respuesta' });
  }
};

// Obtener respuestas de un comentario por su _id
exports.getResponsesByCommentId = async (req, res) => {
  try {
    const { comentarioId } = req.body;

    // Busca el comentario por su _id en la base de datos
    const comentario = await Comments.findById(comentarioId);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    // Envía las respuestas del comentario como respuesta
    res.json(comentario.respuestas);
  } catch (error) {
    console.error('Error al obtener respuestas:', error);
    res.status(500).json({ error: 'Error al obtener respuestas' });
  }
};

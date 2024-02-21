const Comments = require('../models/comments')

// Obtener comentarios por ID de juego
exports.getCommentsByGameId = async (req, res) => {
  try {
    const { id } = req.body; // Obtener el ID del juego del cuerpo de la solicitud
    const comments = await Comments.find({ gameId: id });

    res.status(200).json(comments);
    console.log("Comentarios obtenidos con éxito", comments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Error en el servidor" });
  }
};

//add a comment to a game
exports.addCommentToGame = async (req, res) => {
  try {
    const { gameId, title, rating, description } = req.body;

    // Crear un nuevo comentario
    const newComment = new Comments({
      gameId, // gameId se obtiene del cuerpo de la solicitud
      title,
      rating,
      description
    });

    // Guardar el comentario en la base de datos
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Error en el servidor" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del comentario de los parámetros de la URL

    // Utilizar el método deleteOne de Mongoose para eliminar el comentario por su ID
    const deletedComment = await Comments.deleteOne({ _id: id });

    if (deletedComment.deletedCount === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json({ message: "Comentario eliminado con éxito" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Error en el servidor" });
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

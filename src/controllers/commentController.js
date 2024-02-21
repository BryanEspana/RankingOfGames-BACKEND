const Comments = require('../models/comments')

exports.getCommentsByGameId = async (req, res) => {
    try {
      const gameId = req.params.id;
  
      // Buscar todos los comentarios asociados al juego específico
      const comments = await Comments.find({ gameId });
  
      res.json(comments);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send({ error: "Error en el servidor" });
    }
  };
  

  exports.addCommentToGame = async (req, res) => {
    try {
      const { gameId, title, rating, description } = req.body;
  
      // Crear un nuevo comentario
      const newComment = new Comments({
        gameId,
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
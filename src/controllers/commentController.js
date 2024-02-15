const Comments = require('../models/comments')

exports.showComments = async (req, res) => {
    try {
        const Comentarios = await Comments.find({});
        res.json(Comentarios);
        console.log("Comments", Comentarios);
    } catch (err) {
        console.error("Error al obtener comentarios:", err);
        res.status(500).json({ error: "Hubo un problema al obtener los comentarios" });
    }
};


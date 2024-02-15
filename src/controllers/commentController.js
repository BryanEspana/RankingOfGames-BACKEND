const Comments = require('../models/comments')

exports.showComments = async (req, res) => {
    try {
        const Comentarios = await Comments.find({});
        res.json(Comentarios);
        console.log("Comments", Comentarios);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

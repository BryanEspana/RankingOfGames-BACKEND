const mongoose = require('mongoose');

const StoresSchema = new mongoose.Schema({
    id: Number,
    name: String,
    domain: String,
    slug: String,
    game_count: Number,
    image: String
});

const Stores = mongoose.model('Stores', StoresSchema, 'Stores');
module.exports = Stores;
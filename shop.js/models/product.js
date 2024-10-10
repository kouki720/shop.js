const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    description: String,
    couleurs_disponibles: [String],
    quantite: Number,
    type: String,
    prix: Number,
    image: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// lehna n7adher connection schema w el mangoose w na3mel export
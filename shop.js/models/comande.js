const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutOrder = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    createAccount: { type: Boolean, default: false },
    shipToDifferentAddress: { type: Boolean, default: false },
});

module.exports = mongoose.model('Commande', checkoutOrder);

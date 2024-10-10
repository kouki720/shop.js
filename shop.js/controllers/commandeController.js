const Commande = require('../models/comande');
const Product = require('../models/product');
const mongoose = require('mongoose');
exports.showCheckoutForm = (req, res) => {
    res.render('checkout');
};

exports.processCheckout = async (req, res) => {
    console.log('Processing checkout with data:', req.body);
    try {
        console.log('Processing checkout with data:', req.body);
        const { firstName, lastName, email, mobileNo, address, country, city, state, zipCode, createAccount, shipToDifferentAddress } = req.body;
        
        const newCommande = new Commande({
            _id: new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            email,
            mobileNo,
            address,
            country,
            city,
            state,
            zipCode,
            createAccount: createAccount ? true : false,
            shipToDifferentAddress: shipToDifferentAddress ? true : false,
        });

        console.log('slm');
        await newCommande.save();
        let cart = JSON.parse(req.localStorage.getItem('cart')) || [];
        console.log('Current cart:', cart);
    
        // Remove invalid entries from the wishlist
        cart = cart.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Cleaned cart:', cart);
                // Retrieve the product details in the wishlist
        const cartProducts = await Product.find({ _id: { $in: cart } });
        console.log('cart products:', cartProducts);

        res.send('salem');
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
};

exports.savedatacomande = async (req, res) => {
    console.log('Processing checkout with data:', req.body);
    res.render('cart');
};

exports.savedatacomandes = async (req, res) => {
    console.log('Processing checkout with data:', req.body);
    const { subtotal, shippingcost, grandtotal ,number} = req.body;
    console.log({ subtotal, shippingcost, grandtotal,number });
    res.render('checkout', { subtotal, shippingcost, grandtotal });


    

};
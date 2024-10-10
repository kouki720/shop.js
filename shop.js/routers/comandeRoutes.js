const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/commandeController');

router.get('/checkouttest', (req, res) => {
    console.log('GET /checkout');
    checkoutController.showCheckoutForm(req, res);
});

router.post('/checkouttest', (req, res) => {
    console.log('POST /checkout');
    checkoutController.processCheckout(req, res);
});

router.get('/index', (req, res) => {
    console.log('GET /cart');
    checkoutController.savedatacomande(req, res);
});

router.post('/index', (req, res) => {
    console.log('POST /cart');
    checkoutController.savedatacomandes(req, res);
});


module.exports = router;

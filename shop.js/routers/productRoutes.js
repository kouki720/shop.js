const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for the API
router.get('/products', productController.getAllProducts);

router.get('/Product-list', productController.renderView);

// remarque ne jamais mettre meme /home et /home il provoque error  
router.get('/Home', productController.renderView);



// Route to add product ID to local storage
router.get('/Wishlist/:id', productController.addToWishlist);

// Route for wishlist view
router.get('/Wishlist', productController.wishlistts);



// Route to add product ID to local storage
router.get('/cart/:id', productController.addToCart);

// Route for wishlist view
router.get('/cart', productController.cartts);


// Route for product details
router.get('/product-details/:id', productController.getProductDetails);


router.get('/wishlist-to-cart/:id', productController.wishlistToCart);

router.get('/remove-from-wishlist/:id', productController.removeFromWishlist);


router.get('/remove-from-cart/:id', productController.removeFromcart);



module.exports = router;

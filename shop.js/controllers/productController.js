const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products from MongoDB');
    }
};

exports.renderView = async (req, res) => {
    try {
        const products = await Product.find({});
        const prod = await Product.find({}).sort({ _id: -1 }).limit(7);
        
       

        if (req.originalUrl.includes('/Home')) {
            res.render('index', { products ,prod });
        } else if (req.originalUrl.includes('/Product-list')) {
            res.render('Product-list', { products ,prod});
        } else {
            res.status(404).send('Not Found');
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
};




exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product-details', { product });
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).send('Error fetching product details');
    }
};



exports.addToWishlist = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(`Adding product to wishlist: ${productId}`);

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.error('Invalid product ID');
            return res.status(400).send('Invalid product ID');
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.error('Product not found');
            return res.status(404).send('Product not found');
        }

        // Retrieve the wishlist from node-localstorage or initialize an empty array
        let wishlist = JSON.parse(req.localStorage.getItem('wishlist')) || [];
        console.log('Current wishlist:', wishlist);

        // Remove invalid entries from the wishlist
        wishlist = wishlist.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Cleaned wishlist:', wishlist);

        // Check if the product is already in the wishlist
        if (!wishlist.includes(productId)) {
            // Add the product ID to the wishlist
            wishlist.push(productId);
            // Save the updated wishlist in node-localstorage
            req.localStorage.setItem('wishlist', JSON.stringify(wishlist));
            console.log('Product added to wishlist:', wishlist);
        } else {
            console.log('Product already in wishlist');
        }

        // Retrieve the product details in the wishlist
        const wishlistProducts = await Product.find({ _id: { $in: wishlist } });
        console.log('Wishlist products:', wishlistProducts);

        // Render the view with the products in the wishlist
        res.render('wishlist', { wishlist: wishlistProducts });
    } catch (err) {
        console.error('Error adding product to wishlist:', err);
        res.status(500).send('Error adding product to wishlist');
    }
};
exports.wishlistts =   async (req, res) => {
    try {

        let wishlist = JSON.parse(req.localStorage.getItem('wishlist')) || [];
        console.log('Current wishlist:', wishlist);
    
        // Remove invalid entries from the wishlist
        wishlist = wishlist.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Cleaned wishlist:', wishlist);
                // Retrieve the product details in the wishlist
        const wishlistProducts = await Product.find({ _id: { $in: wishlist } });
        console.log('Wishlist products:', wishlistProducts);

        // Render the view with the products in the wishlist
        res.render('wishlist', { wishlist: wishlistProducts });
    }catch (err) {
        console.error('errrrrrrrrrrr', err);
        res.status(500).send('errrrrrrrrrrrrrrxx');
    }


};


exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(`Adding product to Cart: ${productId}`);

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.error('Invalid product ID');
            return res.status(400).send('Invalid product ID');
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.error('Product not found');
            return res.status(404).send('Product not found');
        }

        // Retrieve the wishlist from node-localstorage or initialize an empty array
        let cart = JSON.parse(req.localStorage.getItem('cart')) || [];
        console.log('Current cart:', cart);

        // Remove invalid entries from the wishlist
        cart = cart.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Cleaned cart:', cart);

        // Check if the product is already in the wishlist
        if (!cart.includes(productId)) {
            // Add the product ID to the wishlist
            cart.push(productId);
            // Save the updated wishlist in node-localstorage
            req.localStorage.setItem('wishlist', JSON.stringify(cart));
            console.log('Product added to cart:', cart);
        } else {
            console.log('Product already in cart');
        }

        // Retrieve the product details in the wishlist
        const cartProducts = await Product.find({ _id: { $in: cart } });
        console.log('cart products:', cartProducts);

        // Render the view with the products in the wishlist
        res.render('cart', { cart: cartProducts });
    } catch (err) {
        console.error('Error adding product to wishlist:', err);
        res.status(500).send('Error adding product to wishlist');
    }
};
exports.cartts =   async (req, res) => {
    try {

        let cart = JSON.parse(req.localStorage.getItem('cart')) || [];
        console.log('Current cart:', cart);
    
        // Remove invalid entries from the wishlist
        cart = cart.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Cleaned cart:', cart);
                // Retrieve the product details in the wishlist
        const cartProducts = await Product.find({ _id: { $in: cart } });
        console.log('cart products:', cartProducts);

        // Render the view with the products in the wishlist
        res.render('cart', { cart : cartProducts});
    }catch (err) {
        console.error('errrrrrrrrrrr', err);
        res.status(500).send('errrrrrrrrrrrrrrxx');
    }


};




exports.wishlistToCart = async (req, res) => {
    try {
        const productId = req.params.id;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Retrieve the wishlist and cart from node-localstorage or initialize an empty array
        let wishlist = JSON.parse(req.localStorage.getItem('wishlist')) || [];
        console.log('Current wishlist1:', wishlist);
        let cart = JSON.parse(req.localStorage.getItem('cart')) || [];

        console.log('Current cart1:', cart);


        // Remove invalid entries from the wishlist
        wishlist = wishlist.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Current wishlist1:', wishlist);
        cart = cart.filter(id => mongoose.Types.ObjectId.isValid(id));
        console.log('Current cart1:', cart);

        // Check if the product is in the wishlist
        if (wishlist.includes(productId)) {
            // Remove the product from the wishlist
            wishlist = wishlist.filter(id => id !== productId);
            console.log('Current after removing wishlist1:', wishlist);

            // Add the product to the cart if it's not already there
            if (!cart.includes(productId)) {
                cart.push(productId);
                console.log('Current after ADD cart1:', cart);
            }

            // Save the updated wishlist and cart in node-localstorage
            req.localStorage.setItem('wishlist', JSON.stringify(wishlist));
            req.localStorage.setItem('cart', JSON.stringify(cart));

            return res.redirect('/cart'); // Redirect to wishlist page
        } else {
            return res.status(404).json({ success: false, message: 'Product not in wishlist' });
        }

    } catch (err) {
        console.error('Error moving product from wishlist to cart:', err);
        res.status(500).json({ success: false, message: 'Error moving product from wishlist to cart' });
    }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const productId = req.params.id;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        // Retrieve the wishlist from node-localstorage or initialize an empty array
        let wishlist = JSON.parse(req.localStorage.getItem('wishlist')) || [];

        // Remove invalid entries from the wishlist
        wishlist = wishlist.filter(id => mongoose.Types.ObjectId.isValid(id));

        // Check if the product is in the wishlist
        if (wishlist.includes(productId)) {
            // Remove the product from the wishlist
            wishlist = wishlist.filter(id => id !== productId);

            // Save the updated wishlist in node-localstorage
            req.localStorage.setItem('wishlist', JSON.stringify(wishlist));

            return res.redirect('/wishlist'); // Redirect to wishlist page
        } else {
            return res.status(404).json({ success: false, message: 'Product not in wishlist' });
        }

    } catch (err) {
        console.error('Error removing product from wishlist:', err);
        res.status(500).json({ success: false, message: 'Error removing product from wishlist' });
    }
};

// Remove product from cart
exports.removeFromcart = async (req, res) => {
    try {
        const productId = req.params.id;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        // Retrieve the cart from node-localstorage or initialize an empty array
        let cart = JSON.parse(req.localStorage.getItem('cart')) || [];

        // Remove invalid entries from the wishlist
        cart = cart.filter(id => mongoose.Types.ObjectId.isValid(id));

        // Check if the product is in the wishlist
        if (cart.includes(productId)) {
            // Remove the product from the wishlist
            cart = cart.filter(id => id !== productId);

            // Save the updated wishlist in node-localstorage
            req.localStorage.setItem('cart', JSON.stringify(cart));

            return res.redirect('/cart'); // Redirect to wishlist page
        } else {
            return res.status(404).json({ success: false, message: 'Product not in wishlist' });
        }

    } catch (err) {
        console.error('Error removing product from wishlist:', err);
        res.status(500).json({ success: false, message: 'Error removing product from wishlist' });
    }
};
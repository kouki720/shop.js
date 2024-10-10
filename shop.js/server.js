// Importations et configurations initiales
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');
const bodyParser = require('body-parser');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const checkoutRoutes = require('./routers/comandeRoutes');


const app = express();
const url = 'mongodb://localhost:27017/shop';

app.use(express.json());

// Middleware to add local storage to each request
app.use((req, res, next) => {
    req.localStorage = localStorage;
    next();
});
// Middleware global pour logger chaque requête
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

// Utilisation de middlewares
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Définition des routes
app.use('/', productRoutes);
app.use('/', userRoutes); 
app.use('/', checkoutRoutes);

app.get('/contact', (req, res) => {
    res.render('contact');
});



app.get('/cart', (req, res) => {
    res.render('cart');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/myacount', (req, res) => {
    res.render('myacount');
});

app.get('/Wishlist', (req, res) => {
    res.render('Wishlist');
});



app.listen(3000, () => console.log('Server running on port 3000'));

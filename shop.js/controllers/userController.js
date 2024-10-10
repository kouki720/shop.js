const User = require('../models/ussser'); // Ensure correct model path
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.register = async (req, res) => {
    const { name, prenom, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            prenom,
            email,
            password,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        
        res.render('index')
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

exports.renderRegister = (req, res) => {
    res.render('register');
};

exports.renderLogin = (req, res) => {
    res.render('login');
};

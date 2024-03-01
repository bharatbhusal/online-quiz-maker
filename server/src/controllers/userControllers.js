const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const env = require("../utils/validateEnv")
const config = env.JWT_SECRECT_KEY

const registerUser = async (req, res) => {
    try
    {
        const { username, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error)
    {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user)
        {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error)
    {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};

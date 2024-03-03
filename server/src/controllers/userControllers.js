const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const UserModel = require('../models/UserModel');
const env = require("../utils/validateEnv")

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
        const newUser = await UserModel.create({ userId: v4(), username, email, password: hashedPassword });
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
            return res.status(400).json({ message: `User doesn't exist` });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({ message: 'Incorrect Password' });
        }
        const payload = {
            user: email
        }
        const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRECT)
        res.status(200).json({ accessToken: accessToken })
    } catch (error)
    {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};

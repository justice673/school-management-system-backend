const authService = require('../services/auth.service');
const User = require('../models/User');
// const sendEmail = require('../utils/sendEmail'); // Add this to send emails
const crypto = require('crypto'); 

// Login function
const login = async (req, res) => {
    const verify = await authService.login(req.user, req.body.password);
    if (!verify.error) {
        return res.json(verify);
    }

    return res.status(400).json(verify);
};

// Register function
const register = async (req, res) => {
    const create = await authService.register(req.body);
    res.status(201).json(create);
};

module.exports = { login, register };

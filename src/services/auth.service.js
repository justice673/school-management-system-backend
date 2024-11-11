const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Hash the password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Invalid password: ' + error.message);
    }
}

// Compare the password with the hashed password
const hashCompare = async (value, hash) => {
    try {
        return await bcrypt.compare(value, hash);
    } catch (error) {
        return false;
    }
}

// Generate OTP (using a static key for now)
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const verifyOtp = (inputOtp, storedOtp) => {
    return inputOtp === storedOtp;
};

// Verify the JWT token
const tokenVerify = (token) => {
    try {
        return jwt.verify(token, 'secret_key');
    } catch (error) {
        return false;
    }
};

const verifyIfIsUnique = async (field, value) => {
    try {
        return await User.findOne({ [field]: value });
    } catch (error) {
        console.error("Error in verifyIfIsUnique:", error);
        return null; // Return null if there's an error
    }
};

// Register a new user
const register = async (data) => {
    const password = await hashPassword(data.password);
    data.password = password;

    const user = new User(data);
    await user.save();
    return {
        error: false,
        message: 'User registered successfully.'
    };
}

// Login the user
const login = async (user, password) => {
    const compare = await hashCompare(password, user.password);

    if (!compare) {
        return {
            error: true,
            message: 'Invalid email or password.'
        };
    }

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
    return {
        error: false,
        message: 'Login successful.',
        token: token
    };
};

// New: Reset the user's password
const resetPassword = async (user, newPassword) => {
    try {
        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        // Clear the reset token and expiration fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the updated user
        await user.save();

        return {
            error: false,
            message: 'Password successfully reset.'
        };
    } catch (error) {
        return {
            error: true,
            message: 'Error resetting password: ' + error.message
        };
    }
};

module.exports = { 
    verifyIfIsUnique, 
    register, 
    login, 
    tokenVerify, 
    hashPassword,
    resetPassword, 
    generateOtp, 
    verifyOtp 
};

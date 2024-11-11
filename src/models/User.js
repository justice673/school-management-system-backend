const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const crypto = require('crypto'); // Import crypto for generating the reset token

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    otpCode:{
        type: String
    },
    otpExpiry:{
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Instance method to hash passwords
userSchema.methods.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Instance method to generate password reset token and expiration
userSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex'); // Token of 20 bytes
    this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
};

// Compare password method
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

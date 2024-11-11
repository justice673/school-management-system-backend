const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        enum: ['Graphic Design', 'Web Development', 'Cybersecurity', 'DevOps', 'App Development'],
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('Course', courseSchema);

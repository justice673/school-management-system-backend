const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { 
      type: String,
      required: true 
    },
    studentId: { 
      type: String,
      unique: true,
      default: () => Math.random().toString(36).substr(2, 9).toUpperCase() 
    },
    grade: {
      type: String,
      required: true 
    },
    phone: {
      type: String, 
      required: true
    },
    address: {
      type: String, 
      required: true
    },
    enrollDate: { 
      type: Date, 
      required: true 
    },
    course: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    }
});

module.exports = mongoose.model('Student', studentSchema);

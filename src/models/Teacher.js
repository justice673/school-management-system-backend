const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({

    name: { 
      type: String,
      required: true 
    },
    teacherId: { 
      type: String,
       required: true,
        unique: true 
    },
   grade: {
         type: String,
          required: true 
        },
    course: {
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
});


module.exports = mongoose.model('Teacher', teacherSchema);
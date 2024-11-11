const {Router} = require("express");
const router = Router();

const studentController = require('../src/controllers/student.controller');

// Route to create a student
router.post('/', studentController.createStudent);

// Route to get all students
router.get('/', studentController.getAllStudents);

// Route to update a student
router.put('/:id', studentController.updateStudent);

// Route to delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;

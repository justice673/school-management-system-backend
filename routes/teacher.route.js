const {Router} = require("express");
const router = Router();

const teacherController = require('../src/controllers/teacher.controller');

// Route to create a teacher
router.post('/', teacherController.createTeacher);

// Route to get all teachers
router.get('/', teacherController.getAllTeachers);

// Route to update a teacher
router.put('/:id', teacherController.updateTeacher);

// Route to delete a teacher
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;

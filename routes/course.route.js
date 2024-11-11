const { Router } = require("express");
const router = Router();


const courseController = require('../src/controllers/course.controller');

// Route to create a course
router.post('/', courseController.createCourse);

// Route to get all courses
router.get('/', courseController.getAllCourses);

// Route to update a course
router.put('/:id', courseController.updateCourse);

// Route to delete a course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;

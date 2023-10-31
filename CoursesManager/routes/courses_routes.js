const express=require('express')
const router=express.Router()
const { body } = require('express-validator');
// import outsoursed modules
const course_controllers=require('../controllers/courses_controllerts');
const validation=require('../middlewares/validation')

// get all courses,
// create new course

router.route('/')
.get(course_controllers.get_courses)
.post(validation ,course_controllers.add_course)

// get a single course
// update course

router.route('/:course_id')
.get(course_controllers.get_single_course)
.patch(course_controllers.update_course)

const {validationResult}=require('express-validator')


module.exports = router;

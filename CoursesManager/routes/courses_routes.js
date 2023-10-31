const express = require("express");
const router = express.Router();

// import outsoursed modules
const course_controllers = require("../controllers/courses_controllerts");
const verfiy_token = require("../middlewares/verfiy_token");
const { body } = require("express-validator");
const user_roles = require("../utils/user_roles");
const alloewd_to = require("../middlewares/allowed_to");
// get all courses
router.get("/api/courses", course_controllers.get_courses);
// get a single course:
router.get("/api/courses/:course_id", course_controllers.get_single_course);
// create new course:
router.post(
  "/api/courses",
  //validation using express-validator
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required ")
      .isLength({ min: 2 })
      .withMessage("Name is atleast 2"),
    body("price").notEmpty().withMessage("price is required "),
  ],
  course_controllers.add_course,
  verfiy_token
);
// update course:
router.patch("/api/courses/:course_id", course_controllers.update_course);

//delete course:
router.delete(
  "/api/courses/:course_id",
  verfiy_token,
  alloewd_to(user_roles.MANAGER, user_roles.MANAGER),
  course_controllers.delete_course
);

module.exports = router;

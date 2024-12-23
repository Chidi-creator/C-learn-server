const express = require("express");
const router = express.Router();
const {
  courseEnrol,
  getAssignedCourses,
  getTeacherDetails
} = require("../../controllers/enrollTeachers");

router.route("/enrollTeachers").post(courseEnrol);

router.get("/enrollTeachers/:id", getAssignedCourses);

router.get("/teacher/details/:id", getTeacherDetails);

module.exports = router;

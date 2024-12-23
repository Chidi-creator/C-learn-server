const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  getAllUsers,
  getAllStudents,
} = require("../../controllers/User");

//route to fetch teachers
router.route("/teachers").get(getAllTeachers);

// route to get All students

router.route("/students").get(getAllStudents);

//route to get all users
router.route("/get-users").get(getAllUsers);

module.exports = router;

const express = require('express')
const router = express.Router()
const {enrollCourses, getAllEnrolledCourses} = require('../../controllers/studentCourses')

router.route('/enroll/courses/:id')
.post(enrollCourses)
.get(getAllEnrolledCourses)

module.exports = router
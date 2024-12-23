const Users = require('../model/user')
const Courses = require('../model/courses')
const Enrollments = require('../model/enrolledCourses')


const getStatistics = async(req, res) =>{
try{
const totalUsers = await Users.countDocuments()
const totalTeachers = await Users.countDocuments({ role: "teacher" });
const totalCourses = await Courses.countDocuments();
const totalEnrollments = await Enrollments.countDocuments();

res.json({totalUsers, totalTeachers, totalCourses, totalEnrollments})
}catch(err){
    res.status(500).json({ error: "Failed to fetch statistics" });
}
}

module.exports = getStatistics
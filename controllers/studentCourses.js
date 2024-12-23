const EnrolledCourses = require("../model/enrolledCourses");
const User = require('../model/user')
const {logActivity} = require('../middleware/activity')

const enrollCourses = async (req, res) => {
  const { id } = req.params;
  const { course_id } = req.body;


  if (!course_id) {
    return res.status(400).json({ message: "Course ID is required" });
  }


  try {
    const enrolledCourse = await EnrolledCourses.findOne({ userId: id });
    const user = await User.findOne({_id: id})

    if (enrolledCourse) {
        if (enrolledCourse.enrolled_courses.includes(course_id)) {
            return res
              .status(409)
              .json({ message: "You have already enrolled for this course" });
          }
    
      enrolledCourse.enrolled_courses.push(course_id);
      await enrolledCourse.save();
      res.status(201).json({ enrolledCourse });
      console.log("active")
    } else {
      const enrolledCourse = await EnrolledCourses.create({
        userId: id,
        enrolled_courses: [course_id],
      });
        await(enrolledCourse.userId, enrolledCourse.user)
        await logActivity(user._id, user.username, 'Course Enrollment')
      res.status(201).json({ enrolledCourse });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllEnrolledCourses = async(req, res) =>{
    const {id} = req.params
try{
    const enrolledCourses = await EnrolledCourses.findOne({userId: id}).populate('enrolled_courses')

    const courseDetails = enrolledCourses.enrolled_courses.map(course => ({
        _id: course._id,
        coursename: course.coursename,
        thumbnail: course.thumbnail,
        description: course.description
    }))


    res.status(200).json(courseDetails)
       
}catch(err){
    console.log(err.message)
}
}

module.exports = { enrollCourses, getAllEnrolledCourses };

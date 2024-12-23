const Courses = require("../model/courses");

const createCourses = async (req, res) => {
  const { courseName, description } = req.body;
  const thumbnail = req.file.filename;
  try {
    const course = await Courses.create({
      coursename: courseName,
      thumbnail,
      description,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find({});
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingleCourse = async(req, res) =>{
const {id} = req.params
try{
    const course = await Courses.findOne({_id: id})
    res.status(200).json(course)
}catch(err){

}
}

module.exports = {
  createCourses,
  getAllCourses,
  getSingleCourse
};

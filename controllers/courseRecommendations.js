const Course = require('../model/courses')
const Enrollment = require('../model/enrolledCourses')
const getCourseRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all courses
    const allCourses = await Course.find({});

    // Fetch user's enrolled courses
    const enrolledCourses = await Enrollment.find({ userId: userId }).select('enrolled_courses');
    const enrolledCourseIds = enrolledCourses.map(e => e.courseId);

    // Filter out enrolled courses
    const unenrolledCourses = allCourses.filter(course => !enrolledCourseIds.includes(course._id.toString()));

    // Randomly select 5-7 courses
    const recommendedCourses = sampleSize(unenrolledCourses, Math.min(unenrolledCourses.length, 7));

    res.json(recommendedCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function sampleSize(array, n) {
  return shuffle(array).slice(0, n);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  getCourseRecommendations,
};
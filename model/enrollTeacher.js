const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enrollTeacherSchema = new Schema({
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    course_id: [{
        type: mongoose.Types.ObjectId,
        ref: "courses"
    }]
});

module.exports = mongoose.model("TeacherCourses", enrollTeacherSchema);

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const enrolledCoursesSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    enrolled_courses: [{
        type: mongoose.Types.ObjectId,
        ref: "courses"
        }
    ]
},
{
    timestamps: true
}
)

module.exports = mongoose.model("enrolledcourses", enrolledCoursesSchema)
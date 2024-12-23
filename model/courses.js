const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    coursename: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},
{timestamps: true}
)


module.exports = mongoose.model("courses", coursesSchema)
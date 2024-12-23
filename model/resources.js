const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const resourcesSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "courses"
    },
    resources:{
        type: String,
        required: true
    },
    description: String
    
    
})

module.exports = mongoose.model("Resources", resourcesSchema)
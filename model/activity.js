const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const activitySchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    action: String,
    timestamp: { type: Date, default: Date.now },
  });

module.exports = mongoose.model("Activities", activitySchema)
  
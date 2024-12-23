const Activity = require('../model/activity')

const logActivity = async(userId, userName, action) =>{
    try{
        await Activity.create({
            userId, userName, action
        })

    }catch(err){
        console.log(`failed to log activity ${err}`)
    }

}

    module.exports = {logActivity}
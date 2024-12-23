const EnrolledTeachers = require('../model/enrollTeacher')
const User = require('../model/user')
const {logActivity} = require('../middleware/activity')


const courseEnrol = async (req, res) =>{
        const {selectedTeacher, selectedCourse} = req.body
        try{
            const enrolledTeacher = await EnrolledTeachers.findOne({teacher_id: selectedTeacher})
            const user = await User.findOne({_id: selectedTeacher})

            if(enrolledTeacher){
                if(enrolledTeacher.course_id.includes(selectedCourse)){
                   return res.status(409).json({message: "Already assigned to this course"})
                }

                enrolledTeacher.course_id.push(selectedCourse)
                await enrolledTeacher.save()
                return res.status(201).json(enrolledTeacher)
            }else{
                const newEnroll = await EnrolledTeachers.create({
                    teacher_id: selectedTeacher,
                    course_id: [selectedCourse]
                })
                await logActivity(user._id, user.username, 'Enrolling In Course')
               return res.status(201).json(newEnroll)
              
            }
        }catch(err){
               return res.status(400).json({message: err.message})
        }
}

    const getAssignedCourses = async(req, res) =>{
        const {id} = req.params
        try{
            const enrolledCourses = await EnrolledTeachers.findOne({teacher_id: id}).populate('course_id')
        
            const courseDetails = enrolledCourses.course_id.map(course => ({
                _id: course._id,
                coursename: course.coursename,
                thumbnail: course.thumbnail,
                description: course.description
            }))
        
        
            res.status(200).json(courseDetails)
               
        }catch(err){
           res.status(500).json({message: err.message})
        }
    }

    const getTeacherDetails = async(req, res) =>{
            const {id} = req.params
            try{
                const teacherDetails = await EnrolledTeachers.find({course_id: {$in: [id]}}).populate('teacher_id')
                if(!teacherDetails) res.status(209).json({message: "No resource found "})

                    res.status(200).json(teacherDetails)
            }catch(err){
                    console.log(err.message)
                    res.status(500).json({message: err.message})
            }
    }

    module.exports = {courseEnrol, getAssignedCourses, getTeacherDetails}
const Resources = require("../model/resources");

const createResource = async (req, res) => {
  const { id } = req.params;
  const  filename  = req.file.filename;
  const {description} = req.body
  if (!filename) {
    return res.status(400).json({ message: "File is required" });
  }

  try {
    const newFile = await Resources.create({
      course_id: id,
      resources: filename,
      description: description
    });
    res.status(201).json(newFile)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message: err.message})

  }
};

const getCourseResources = async(req, res) =>{
    const {id} = req.params
    try{
        const courseResouces = await Resources.find({course_id: id})

     const resourceDetails = courseResouces.map(resource => ({
        name: resource.resources,
        description: resource.description
     }))
      
     res.status(200).json(resourceDetails)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {createResource, getCourseResources}

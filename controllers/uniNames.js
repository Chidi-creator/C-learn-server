const universities = require('../model/unis.json')
const uniNames = universities.universities.map(uni => uni.name)

const getUniNames =  (req, res) =>{
   res.status(200).json(uniNames)

}

module.exports = getUniNames


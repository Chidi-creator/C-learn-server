const Users = require("../model/user");

//controller to fetch teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Users.find({
      role: "teacher",
      isActivated: true,
    });
    res.json(teachers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const teachers = await Users.find({
      role: "student",
      isActivated: true,
    });
    res.json(teachers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllTeachers,getAllUsers, getAllStudents };

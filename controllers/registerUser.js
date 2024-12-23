const jwt = require("jsonwebtoken");
const Users = require("../model/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerUsers = async (req, res) => {
  const { username, email, password, institution, role } = req.body;
  try {
    if (!username || !email || !password || !institution || !role)
      return res.status(400).json({ message: "must fill all fields" });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "invalid email" });
    if (!validator.isStrongPassword(password))
      return res.status(400).json({ message: "use a stronger password" });

    const existingEmail = await Users.findOne({ email });

    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existingUsername = await Users.findOne({ username });

    if (existingUsername)
      return res.status(400).json({ message: "username already taken" });

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = await Users.create({
      username,
      email,
      password: hash,
      institution,
      role,
    });

    //create token

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({user, token});
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUsers };
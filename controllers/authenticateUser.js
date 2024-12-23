const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {logActivity} = require('../middleware/activity')

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });

    const user = await Users.findOne({ email });
    if (!user.isActivated)
      return res.status(400).json({ message: "Account has been deactivated" });
    if (!user) return res.status(400).json({ message: "user doesn't exist" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "check your password" });

    //create token
    await logActivity(user._id, user.username, 'Logged In')
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user, token });
    console.log(user._id);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = authUser;

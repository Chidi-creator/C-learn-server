const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "authorization web token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await Users.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(403).json({ message: "Request is not authorised" });
  }
};

module.exports = verifyAuth;

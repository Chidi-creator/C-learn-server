const express = require("express");
const router = express.Router();
const authUser = require("../../controllers/authenticateUser");

router.route("/").post(authUser);

module.exports = router;

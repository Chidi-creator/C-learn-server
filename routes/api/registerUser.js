const { registerUsers } = require("../../controllers/registerUser");

const express = require("express");
const router = express.Router();

        router.route('/')
            .post(registerUsers)


            module.exports = router
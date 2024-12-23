const express = require("express");
const router = express.Router();

const getStatistics = require("../../controllers/statistics");

router.route("/statistics").get(getStatistics);

module.exports = router;

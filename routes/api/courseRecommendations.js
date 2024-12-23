const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/courseRecommendations');

router.get('/recommended-courses/:userId', courseController.getCourseRecommendations);

module.exports = router;
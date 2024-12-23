const express = require('express')
const router = express.Router()
const uniNamesController = require('../../controllers/uniNames')


router.route('/')
    .get(uniNamesController)

module.exports = router
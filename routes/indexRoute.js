const express = require('express')
const router = express.Router();
const controller = require('../contollers/routeControllers/indexController')

router.get('/', controller.get)

module.exports = router;
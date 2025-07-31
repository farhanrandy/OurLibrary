const express = require('express');
const Controller = require('../controllers/controllers');
const router = express.Router();

router.get('/', Controller.profileHome); // List profiles
router.get('/add', Controller.profileGetAdd); // Show add profile form
router.post('/add', Controller.profileHandleAdd); // Handle profile addition

module.exports = router;
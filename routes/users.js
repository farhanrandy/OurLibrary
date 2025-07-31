const express = require('express');
const Controller = require('../controllers/controllers');
const router = express.Router();

router.get('/', Controller.userHome); // List users
router.get('/add', Controller.userGetAdd); // Show add user form
router.post('/add', Controller.userHandleAdd); // Handle user addition
router.get('/:userId', Controller.userDetail); // Show user detail

module.exports = router;
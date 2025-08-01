const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/:id', Controller.profileHome); // List profiles
router.get('/edit/:id', Controller.profileGetEdit); // Show add profile form
router.post('/edit/:id', Controller.profileHandleEdit); // Handle profile addition
router.post('/:id/return', Controller.loanHandleReturn);

module.exports = router;
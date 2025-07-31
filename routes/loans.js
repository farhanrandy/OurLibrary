const express = require('express');
const Controller = require('../controllers/controllers');
const router = express.Router();

router.get('/', Controller.loanHome); // List loans
router.get('/add', Controller.loanGetAdd); // Show add loan form
router.post('/add', Controller.loanHandleAdd); // Handle loan addition
router.get('/:loanId', Controller.loanDetail); // Show loan detail

module.exports = router;
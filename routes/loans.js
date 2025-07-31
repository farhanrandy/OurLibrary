const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.post("/:id/return", Controller.loanHandleReturn)
// router.get('/', Controller.loanHome); // List loans
// router.get('/add', Controller.loanGetAdd); // Show add loan form
// router.post('/add', Controller.loanHandleAdd); // Handle loan addition
// router.get('/:loanId', Controller.loanDetail); // Show loan detail

module.exports = router;
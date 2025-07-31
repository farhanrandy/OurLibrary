const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.post("/:id/return", Controller.loanHandleReturn)

module.exports = router;
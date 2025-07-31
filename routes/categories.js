const express = require('express');
const Controller = require('../controllers/controllers');
const router = express.Router();

router.get('/', Controller.categoryHome); // List categories
router.get('/add', Controller.categoryGetAdd); // Show add category form
router.post('/add', Controller.categoryHandleAdd); // Handle category addition
router.get('/:categoryId', Controller.categoryDetail); // Show category detail

module.exports = router;
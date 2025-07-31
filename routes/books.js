const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/', Controller.bookHome); // List books
// router.get('/add', Controller.bookGetAdd); // Show add book form
// router.post('/add', Controller.bookHandleAdd); // Handle book addition
// router.get('/:bookId', Controller.bookDetail); // Show book detail
// router.get('/:bookId/edit', Controller.bookGetEdit); // Show edit book form
// router.post('/:bookId/edit', Controller.bookHandleEdit); // Handle book edit
// router.get('/:bookId/delete', Controller.bookDelete); // Handle book deletion

module.exports = router;
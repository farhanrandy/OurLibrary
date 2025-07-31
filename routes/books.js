const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();
const preserveUserId = require('../middleware/preserveUserId')

router.get('/',preserveUserId, Controller.bookHome); // List books
router.get('/add',preserveUserId, Controller.bookGetAdd); // Show add book form
router.post('/add',preserveUserId, Controller.bookHandleAdd); // Handle book addition
router.get('/:bookId/delete', preserveUserId, Controller.bookDelete)
router.post('/:bookId/borrow', preserveUserId, Controller.bookBorrowHandle);
// router.get('/:bookId', Controller.bookDetail); // Show book detail
router.get('/:bookId/edit', Controller.bookGetEdit); // Show edit book form
router.post('/:bookId/edit', Controller.bookHandleEdit); // Handle book edit

module.exports = router;
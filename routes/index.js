const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();
const profilesRoute = require('./profiles');
const usersRoute = require('./users');
const loansRoute = require('./loans');
const booksRoute = require('./books');
const categoriesRoute = require('./categories');

router.get('/', Controller.home);
router.get('/login', Controller.login)
router.post('/login', Controller.loginHandle)
router.get('/logout', Controller.logoutHandle);


router.use('/profiles', profilesRoute);
router.use('/users', usersRoute);
router.use('/loans', loansRoute);
router.use('/books', booksRoute);
router.use('/categories', categoriesRoute);

module.exports = router;
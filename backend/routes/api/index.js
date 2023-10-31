const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const tasksRouter = require('./tasks');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

module.exports = router;

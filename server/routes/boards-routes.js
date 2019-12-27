const express = require('express');
const { check } = require('express-validator');

const boardsControllers = require('../controllers/boards-controllers');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.use(checkAuth);

router.get('/:bid', boardsControllers.getBoardById);

router.get('/user/:uid', boardsControllers.getBoardsByUserId);

router.post(
  '/',
  [
    check('name')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('category')
      .not()
      .isEmpty()
  ],
  boardsControllers.createBoard
);

router.patch(
  '/:bid',
  [
    check('name')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('category')
      .not()
      .isEmpty(),
    check('starred')
      .not()
      .isEmpty()
      .isBoolean(),
    check('color')
      .not()
      .isEmpty()
  ],
  boardsControllers.updateBoard
);

router.delete('/:bid', boardsControllers.deleteBoard);

module.exports = router;

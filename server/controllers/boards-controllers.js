const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const { Board } = require('../models/board');
const { User } = require('../models/user');

const getBoardById = async (req, res, next) => {
  const boardId = req.params.bid;

  let board;
  try {
    board = await Board.findById(boardId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a board.',
      500
    );
    return next(error);
  }

  if (!board) {
    const error = new HttpError(
      'Could not find board for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ board: board.toObject({ getters: true }) });
};

const getBoardsByUserId = async (req, res, next) => {
  const userId = req.userData.userId;

  let userWithBoards;
  try {
    userWithBoards = await User.findById(userId).populate('boards');
  } catch (err) {
    const error = new HttpError(
      'Fetching boards failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithBoards || userWithBoards.boards.length === 0) {
    return next(
      new HttpError('Could not find boards for the provided user id.', 404)
    );
  }

  res.json({
    boards: userWithBoards.boards.map(place =>
      place.toObject({ getters: true })
    )
  });
};

const createBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, description, category, color } = req.body;

  const createdBoard = new Board({
    name,
    description,
    category,
    color,
    creator: req.userData.userId
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating board failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdBoard.save({ session: sess });
    user.boards.push(createdBoard);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating board failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ board: createdBoard });
};

const updateBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, description, category, starred, color } = req.body;
  const boardId = req.params.bid;

  let board;
  try {
    board = await Board.findById(boardId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update board.',
      500
    );
    return next(error);
  }

  if (board.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this board.', 401);
    return next(error);
  }

  board.name = name;
  board.description = description;
  board.category = category;
  board.starred = starred;
  board.color = color;

  try {
    await board.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update board.',
      500
    );
    return next(error);
  }

  res.status(200).json({ board: board.toObject({ getters: true }) });
};

const deleteBoard = async (req, res, next) => {
  const boardId = req.params.bid;

  let board;
  try {
    board = await Board.findById(boardId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete board.',
      500
    );
    return next(error);
  }

  if (!board) {
    const error = new HttpError('Could not find board for this id.', 404);
    return next(error);
  }

  if (board.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this board.',
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await board.remove({ session: sess });
    board.creator.boards.pull(board);
    await board.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete board.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted board.' });
};

exports.getBoardById = getBoardById;
exports.getBoardsByUserId = getBoardsByUserId;
exports.createBoard = createBoard;
exports.updateBoard = updateBoard;
exports.deleteBoard = deleteBoard;

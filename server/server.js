const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => {
    console.log('Connected to MongoDb');
  }
);

// Models
const { User } = require('./models/user');
const { Board } = require('./models/board');

// Middlewares
const { auth } = require('./middleware/auth');

//======================================
//          BOARDS
//======================================
app.get('/api/boards', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Board.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, boards) => {
      if (err) return res.status(400).send(err);

      res.send(boards);
    });
});

/// /api/boards?id=lahdfjkdsahfkj
app.get('/api/boards/boards_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Board.find({ _id: { $in: items } })
    .populate('user')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post('/api/boards', auth, (req, res) => {
  const board = new Board(req.body);

  board.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      board: doc
    });
  });
});

//======================================
//          USERS
//======================================

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname
  });
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      userdata: doc
    });
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found.'
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie('w_auth', user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { token: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

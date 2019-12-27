const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  boards: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Board' }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };

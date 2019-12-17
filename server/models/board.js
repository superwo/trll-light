const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      required: true,
      type: String,
      maxlength: 100
    },
    starred: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'green'
    },
    lists: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };

'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'category'
});
CategorySchema.plugin(uniqueValidator);
module.exports = mongoose.model('category', CategorySchema);

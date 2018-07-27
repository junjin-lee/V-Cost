'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var CostItemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
    unique: true
  },
  category_name: String,
  // categoryId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'category'
  // },
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
  collection: 'costitem'
});
// CostItemSchema.static = {
//   findCostItemWithCategory: function (cb) {
//     return this
//       .find({})
//       .populate('categoryId') //注意这是联合查询的关键
//       .sort('updateAt')
//       .exec(cb)
//   }
// };

CostItemSchema.plugin(uniqueValidator);
module.exports = mongoose.model('costitem', CostItemSchema);

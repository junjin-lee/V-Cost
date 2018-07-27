'use strict';

var mongoose = require('mongoose');
var CostSchema = new mongoose.Schema({
  category_name: String,
  item_name: String,
  project_name: String,
  project_no: String,
  plan_cost: Number,
  start_date: Date,
  completed_date: Date,
  project_budget: Number,
  company: String,
  project_cost: Number,
  final_date: Date,
  image_data: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  createBy: String,
  updateAt: {
    type: Date,
    default: Date.now()
  },
  updateBy: String
}, {
  collection: 'costs'
});

module.exports = mongoose.model('cost', CostSchema);

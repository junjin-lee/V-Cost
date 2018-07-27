'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  password: String,
  enabled: {
    type: String,
    default: 'Y'
  },
  email: String,
  phone: String,
  sex: String,
  userface: String,
  regTime: {
    type: Date,
    default: Date.now
  },
  role: [Number],
  banned: {
    type: Boolean,
    default: false
  }
});

UserSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('User', UserSchema);

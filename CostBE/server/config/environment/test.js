'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://@db.yomath.com:27017/app',
    options:{
      user:'appuser',
      pass:'aq1sw2de'
    }
  }
};

'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  port: 9000,
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://@localhost:27017/costdb'
  }
};

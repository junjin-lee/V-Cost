const jwt = require('jsonwebtoken');
const config = require('../config/environment');

module.exports.cors = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,x-access-token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", "CVI Support Team");
  if (req.method == "OPTIONS") res.send(200);
  else next();
};


module.exports.mustlogin = function (req, res, next) {
  // if (config.env === 'development') {
  //   return next();
  // }

  var token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'cv1isAwes0me!', function (err, decoded) {
      if (err) {
        console.error("JWT Verification Error", err);
        return res.status(403).send({
          message: err.message
        });
      } else {
        console.log('decoded: ', decoded);

        req.user = decoded.user;
        return next();
      }
    });
  } else {
    res.status(403).send({
      message: 'Token not provided'
    });
  }
};

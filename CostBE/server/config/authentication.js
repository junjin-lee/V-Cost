var config = require('./environment');
const crypto = require("crypto");
//var user = require("../api/user");
var User = require('../model/User');

function checkW3SSO(username, password) {
  return new Promise(function (resolve, reject) {
    console.log(username);
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");

    User.findOne({
        'username': username
      }).exec()
      .then(entity => {
        // user does not register yet
        if (!entity) {
          return reject("用户未注册");
        } else {
          if (entity.enabled === 'Y' && entity.password === newPas) {
            resolve();
            console.log("Logging in");
          } else {
            console.log("Logging error");
            reject("用户名或密码错误");
          }
        }
      })
  })
}

module.exports = {
  checkW3SSO: config.env === 'development' ? f => Promise.resolve() : checkW3SSO
};

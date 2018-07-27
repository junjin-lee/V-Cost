'use strict';

var User = require('../../model/User');
const crypto = require("crypto");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}


function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(200).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Resources
exports.find = function (req, res) {
  return User.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Gets a single User from the DB
exports.show = function (req, res) {
  console.log('user.info:' + req.user);
  return User.findOne({
      'username': req.user
    }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));

};

// Creates a new User in the DB( maybe non CVI user first time login)
exports.create = function (req, res) {
  let user = req.body;
  let md5 = crypto.createHash("md5");
  Reflect.deleteProperty(req.body, '_id');
  if (!user.password)
    user.password = "123456"; //set init password for new user
  let newPas = md5.update(user.password).digest("hex");
  user.password = newPas;
  return User.create(user)
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Upserts the given User in the DB at the specified ID
exports.upsert = function (req, res) {
  console.log("update user");
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return User.findOneAndUpdate({
      _id: req.params.id
    }, req.body).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

exports.editinfo = function (req, res) {
  console.log("========================");
  const username = req.body.username;
  console.log("editinfo user" + req.body);

  let user = {};
  if (req.body.newpassword1 !== '') {
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(req.body.newpassword1).digest("hex");
    user.password = newPas;
  }
  user.nickname = req.body.nickname;
  user.phone = req.body.phone;
  user.email = req.body.email;
  console.log(user);

  return User.findOneAndUpdate({
      username: username
    }, user, {
      new: true
    }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};



// Updates an existing User in the DB
exports.patch = function (req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Deletes a User from the DB
exports.destroy = function (req, res) {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.logout = function (req, res) {
  console.log('logout:' + req.user);
  // TODO invalidate token here.

  res.status(200).end();
};

'use strict';

var jsonpatch = require('fast-json-patch');
var Category = require('./category.model');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(201).end();
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

// Gets a list of Categorys
exports.index = function (req, res) {
  return Category.find().exec()
    .then(
      respondWithResult(res)
    ).catch(handleError(res));
};

// Gets a single Category from the DB
exports.show = function (req, res) {
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Creates a new Category in the DB
exports.create = function (req, res) {
  Reflect.deleteProperty(req.body, '_id');
  return Category.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};

// Upserts the given Category in the DB at the specified ID
exports.upsert = function (req, res) {
  console.log("put para", req.params.id);
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  // return Category.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
  return Category.findOneAndUpdate({
      _id: req.params.id
    }, req.body).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Updates an existing Category in the DB
exports.patch = function (req, res) {
  console.log("backend patch id:", req.params.id);
  console.log("backend:", req.body);
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Deletes a Category from the DB
exports.destroy = function (req, res) {
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

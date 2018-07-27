'use strict';

var jsonpatch = require('fast-json-patch');
var CostItem = require('./costitem.model');

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

// Gets a list of CostItems
exports.index = function (req, res) {
  return CostItem.find().exec()
    .then(
      respondWithResult(res)
    ).catch(handleError(res));
};

// Gets a single CostItem from the DB
exports.show = function (req, res) {
  return CostItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Creates a new CostItem in the DB
exports.create = function (req, res) {
  return CostItem.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};

// Upserts the given CostItem in the DB at the specified ID
exports.upsert = function (req, res) {
  console.log("put para upsert", req.params.id);
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  // return CostItem.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
  return CostItem.findOneAndUpdate({
      _id: req.params.id
    }, req.body).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Updates an existing CostItem in the DB
exports.patch = function (req, res) {
  console.log("backend patch id:", req.params.id);
  console.log("backend:", req.body);
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return CostItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Deletes a CostItem from the DB
exports.destroy = function (req, res) {
  return CostItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

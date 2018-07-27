'use strict';

var Cost = require('./cost.model');
const QueryBuilder = require('../../utils/query_builder');
const Parse = require('csv-parse');
const fs = require('fs');

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

exports.find = function (req, res) {
  console.log('cost.find');
  const {
    query,
    page,
    limit
  } = QueryBuilder.buildCost(req);
  console.log(query);
  Cost.count(query, function (err, count) {
    Cost.find(query, null, {})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit)
      .exec(function (err, docs) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json({
            total: count,
            data: docs
          });
        }
      });
  });
};

// Gets a list of Costs
// exports.index = function (req, res) {
//   return Cost.find().exec()
//     .then(
//       respondWithResult(res)
//     ).catch(handleError(res));
// };

// Gets a single Cost from the DB
exports.show = function (req, res) {
  return Cost.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Creates a new Cost in the DB
exports.create = function (req, res) {
  Reflect.deleteProperty(req.body, '_id');
  return Cost.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};

// Upserts the given Cost in the DB at the specified ID
exports.upsert = function (req, res) {
  console.log("put para", req.params.id);
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  // return Cost.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
  return Cost.findOneAndUpdate({
      _id: req.params.id
    }, req.body).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Updates an existing Cost in the DB
exports.patch = function (req, res) {
  console.log("backend patch id:", req.params.id);
  console.log("backend:", req.body);
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Cost.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Deletes a Cost from the DB
exports.destroy = function (req, res) {
  return Cost.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

// Creates a new Cost in the DB( maybe non CVI user first time login)
exports.importCosts = function (req, res) {
  console.log('import costs:' + req.user);

  var filePath = req.file.path;
  console.log(filePath);

  var bulk = Cost.collection.initializeOrderedBulkOp();

  function onNewRecord(record) {
    let cost = {
      category_name: record['Seat/Role ID'],
      item_name: record['Opportunity ID'],
      project_name: record['project_name'],
      project_no: record['project_no'],
      plan_cost: parseFloat(record['plan_cost']),
      start_date: new Date(record['start_date']),
      completed_date: new Date(record['completed_date']),
      project_budget: parseFloat(record['plan_cost']),
      company: record['company'],
      project_cost: parseFloat(record['plan_cost']),
      final_date: new Date(record['final_date'])
    };
    bulk.insert(cost);
  }

  function onError(error) {
    console.log('csv parse error:');
    console.log(error);

    console.log('removing temp files:' + filePath);
    fs.unlinkSync(filePath);

    res.status(400).send({
      message: error.message
    });
  }

  function done(linesRead) {
    console.log('starting bulk update ...');

    bulk.execute(function (err, result) {
      console.log('removing temp files:' + filePath);
      fs.unlinkSync(filePath);

      if (err) {
        console.log('bulk upsert error:', err.message);
        return res.status(400).send({
          message: err.message
        });
      } else {
        respondWithResult(res, 200);
      }
      console.log('bulk upsert complete.');

    });
  }

  let columns = true;
  parseCSVFile(filePath, columns, onNewRecord, onError, done);
};


function parseCSVFile(sourceFilePath, columns, onNewRecord, handleError, done) {
  var source = fs.createReadStream(sourceFilePath);

  var linesRead = 0;

  var parser = Parse({
    delimiter: ',',
    columns: columns,
    skip_empty_lines: true,
    trim: true
  });

  parser.on("readable", function () {
    var record;
    while (record = parser.read()) {
      linesRead++;
      onNewRecord(record);
    }
  });

  parser.on("error", function (error) {
    handleError(error);
  });

  parser.on("end", function () {
    done(linesRead);
  });

  source.pipe(parser);
}



exports.exportCosts = function (req, res) {
  // FIXME change to stream API.

  console.log('resource.exportCaps');

  const {
    query
  } = QueryBuilder.build(req);
  console.log(query);

  Resource.find(query, null, {})
    .lean()
    .exec(function (err, docs) {
      if (err) {
        res.status(500).json(err);
      } else {
        let filename = `Capabilities_${docs.length}_${Date.now()}.csv`;
        res.csv(docs, true, {
          'Content-disposition': 'attachment; filename=' + filename
        });
      }
    });
};

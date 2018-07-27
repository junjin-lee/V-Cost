'use strict';

var Cost = require('../cost/cost.model');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

exports.getItemStatistics = function (req, res) {
  console.log("========report =getItemStatistics=====" + req.body);
  const daterange = req.body;
  console.log(daterange[0]);
  let start = new Date("2018-07-01");
  let end = new Date("2018-08-01");
  Cost.aggregate(
    [{
        $match: {
          "final_date": {
            "$gte": start,
            "$lte": end
          }
        }
      },
      {
        $group: {
          _id: {
            item_name: "$item_name"
          },
          totalAmount: {
            $sum: "$project_cost"
          },
          count: {
            $sum: 1
          }
        }
      }
    ]).then(function (result) {
    console.log(res); // [ { maxBalance: 98000 } ]
    //respondWithResult(res, 200);
    return res.status(200).json(result);
  });
  // function (err, res) {
  //   if (err) {
  //     return res.status(500).send({
  //       message: err.message
  //     });
  //   } else {
  //     console.log(res);
  //     respondWithResult(res, 200);
  //   }
  // });
}

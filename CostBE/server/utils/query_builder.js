module.exports.buildCost = function (req, _page, _limit) {

  let query = req.query;
  const page = _page || +req.query.page;
  const limit = _limit || +req.query.limit;

  delete req.query.page;
  delete req.query.limit;
  var industryQuery = {};
  var languageQuery = {};
  for (let x in query) {
    if (!query[x]) {
      delete query[x];
      continue;
    }

    if (x === 'project_name') {
      query.project_name = new RegExp('^' + query[x]);
    } else if (x === 'project_no') {
      query.project_no = new RegExp('^' + query[x]);
    }
  }

  return {
    query,
    page,
    limit
  };
};

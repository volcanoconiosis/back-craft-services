'use strict';


function handle404(req, res, next) {

  const errorObject = {
    status: 404,
    message: 'Sorry, Page Not Found '
  };

  res.status(404).json(errorObject);
}

module.exports = handle404;
const { constant } = require('../constant')

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: 'Validation field',
        message: err.message,
        stackTrace: err.stack,
      })
      break

    case constant.NOT_FOUND:
      res.json({
        title: 'Not found',
        message: err.message,
        stackTrace: err.stack,
      })
      break

    case constant.FORBIDEN:
      res.json({
        title: 'Forbiden',
        message: err.message,
        stackTrace: err.stack,
      })
      break

    case constant.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      })
      break

    case constant.SERVER_ERROR:
      res.json({
        title: 'Server error',
        message: err.message,
        stackTrace: err.stack,
      })
      break

    default:
        console.log('No Error, All Good..!');
        next();
      break
  }
}

module.exports = errorHandler

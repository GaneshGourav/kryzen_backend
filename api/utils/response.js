const status = require("./status");

exports.successAction = successAction;
exports.failAction = failAction;

function successAction(result, message = "OK", isSuccess = true) {
  return { statusCode: status.SUCCESS, result, message, isSuccess };
}

function failAction(message) {
  return { statusCode: status.FAILURE, message };
}

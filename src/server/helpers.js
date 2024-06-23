const moment = require("moment");

const helpers = {};

helpers.timeago = (timestamp) => {
  return moment(timestamp).startOf("minute").fromNow();
};

helpers.ifEquals = function (userId, user = "") {
  // Accedemos a 'this' para obtener res.locals.user

  if (user.id === userId) {
    return true;
  } else {
    return false;
  }
};

module.exports = helpers;

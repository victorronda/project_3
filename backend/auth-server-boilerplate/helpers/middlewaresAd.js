const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

// Login admin
exports.formFullfilled = () => (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email ) next(createError(400));
  else next();
};
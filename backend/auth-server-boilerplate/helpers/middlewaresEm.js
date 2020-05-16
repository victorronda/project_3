const createError = require('http-errors');

exports.isLoggedInEm = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedInEm = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.formFullfilledEm = () => (req, res, next) => {
  const { name, password } = req.body;
  
  if (!name || !password) next(createError(400));
  else next();
};
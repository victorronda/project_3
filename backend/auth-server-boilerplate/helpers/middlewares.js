const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

/* Al tener 2 Logins, uno como compañía (admin) y otro como employee, se comprueba cosas distintas
ya que en los forms los inputs van a tener nombres distintos */

// Login admin
exports.formFullfilled = () => (req, res, next) => { // Validacion mínima al loguearse
  const { name, password, email } = req.body;

  if (!name || !password || !email ) next(createError(400));
  else next();
};

// Login employee
exports.formFullfilledLogin = () => (req, res, next) => { // Validacion mínima al loguearse
  const { name, password } = req.body;
  
  if (!name || !password) next(createError(400));
  else next();
};
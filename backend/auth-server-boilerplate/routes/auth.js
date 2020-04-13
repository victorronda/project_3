const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Company = require('../models/Company');


// HELPER FUNCTIONS
const { isLoggedIn, isNotLoggedIn, formFullfilled, formFullfilledLogin } = require('../helpers/middlewares');

// POST '/signup'
router.post('/signup', isNotLoggedIn(), formFullfilled(), async (req, res, next) => {
	
	const { name, password, email } = req.body;

	try {
		// chequea si el name de la Company ya existe en la BD
		const companyExists = await Company.findOne({ name });
		// si la compañía ya existe, pasa el error a middleware error usando next()
		if (companyExists) return next(createError(400));
			else {
				// en caso contrario, si la compañía no existe, hace hash del password y crea una nueva compañía en la BD
				const salt = bcrypt.genSaltSync(saltRounds);
				const hashPass = bcrypt.hashSync(password, salt);
				const newCompany = await Company.create({ name, email, password: hashPass });
				// luego asignamos el nuevo documento company a req.session.currentUser y luego enviamos la respuesta en json
				req.session.currentUser = newCompany;
				res
				.status(201).json(newCompany);
			}
	} catch (error) {
		next(error);
		}
	}
);

//  POST '/login/admin'
router.post('/login', isNotLoggedIn(), formFullfilledLogin(), async (req, res, next) => {

	const { name, password } = req.body;

	try {
		// revisa si la compañía existe en la BD
		const company = await Company.findOne({ name });
		// si la compañía no existe, pasa el error al middleware error usando next()
		if (!company) {
			next(createError(404));
			} else if (bcrypt.compareSync(password, company.password)) {
				// si la compañía existe, hace hash del password y lo compara con el de la BD
				// loguea al admin(company) asignando el document a req.session.currentUser, y devuelve un json con el user
				req.session.currentUser = company;
				res.status(200).json(company);
				return;
			} else {
			next(createError(401));
		}
	} catch (error) {
		next(error);
	}
});




// POST '/logout'
router.post('/logout', isLoggedIn(),(req, res, next) => {

	req.session.destroy();
	res.status(204).send();
	return;
});

router.get("/me", isLoggedIn(), (req, res, next) => {
  // si está logueado, previene que el password sea enviado y devuelve un json con los datos del usuario (disponibles en req.session.currentUser)
  req.session.currentUser.password = "*";
  res.json(req.session.currentUser);
});

module.exports = router;
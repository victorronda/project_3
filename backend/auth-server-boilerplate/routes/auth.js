const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Company = require('../models/Company');

const { isLoggedIn, isNotLoggedIn, formFullfilled } = require('../helpers/middlewaresAd');

router.post('/signup', async (req, res, next) => {
	
	const { name, password, email } = req.body;

	try {

		const companyExists = await Company.findOne({name});
		if (companyExists) return next(createError(400));
			else {
				const salt = bcrypt.genSaltSync(saltRounds);
				const hashPass = bcrypt.hashSync(password, salt);
				const newCompany = await Company.create({ name, email, password: hashPass });
				req.session.currentUser = newCompany;

				res.status(201).json(newCompany);
			}

	} catch (error) {
		next(error);
		}
	}
);

router.post('/login', isNotLoggedIn(), async (req, res, next) => {

	const { name, password } = req.body;

	try {
		
		const company = await Company.findOne({name});
	
		if (!company) {
			next(createError(404), alert('This company does not exist'));
			} else if (bcrypt.compareSync(password, company.password)) {
				req.session.currentUser = company;

				res.status(200).json(company);
				//return;
			} else {
			next(createError(401), 'Something else happens');
		}

	} catch (error) {
		next(error);
	}
});

router.post('/logout', isLoggedIn(), (req, res, next) => {
	req.session.destroy();
	res.status(204).send();
	return;
});

router.get("/me", isLoggedIn(), (req, res, next) => {
  // si está logueado devuelve un json con los datos del usuario (disponibles en req.session.currentUser)
  req.session.currentUser.password = "*";
  res.json(req.session.currentUser);
});

module.exports = router;
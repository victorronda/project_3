const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Employee = require('../models/Employee');
const Company = require('../models/Company');

const { isLoggedIn, isNotLoggedIn, formFullfilled } = require('../helpers/middlewaresAd');
const { isLoggedInEm, isNotLoggedInEm, formFullfilledEm } = require('../helpers/middlewaresEm');

// Auth employees

// Login employee (client side)
router.post('/login', isNotLoggedInEm(), formFullfilledEm(), async (req, res, next) => {

	const { name, password } = req.body;

	try {
		const user = await Employee.findOne({name});
		if (!user) {
			next(createError(404));
			} else if (bcrypt.compareSync(password, user.password)) {
				req.session.currentUser = user;
				res.status(200).json(user);
			} else {
				next(createError(401));
		}

	} catch (error) {
		next(error);
	}
});

// Employees management (admin side)

// Add employee (the admin does the signup)
router.post('/staff/add', isLoggedIn(), formFullfilledEm(), async (req, res, next) => {

	const { name, password } = req.body;

	try {
		const user = await Employee.findOne({name});

		if (user) {
			res.json({message: 'User already exists'});
			} else {
				const salt = bcrypt.genSaltSync(saltRounds);
				const hashPass = bcrypt.hashSync(password, salt);
				const newEmployee = await Employee.create(
					{name, password: hashPass, companyId: req.session.currentUser}
					);

				res.status(201).json(newEmployee)

				const companyUpdate = await Company.findByIdAndUpdate(
				req.session.currentUser, 
				{ $push: {employees: newEmployee} },
				{ new: true }
				);

				res.status(200).json(companyUpdate);
		}

	} catch (error) {
		next(error);
	}
});

// Employee list
router.get('/staff', isLoggedIn(), async (req, res, next) => {

	try {
		const employees = await Employee.find();
		res.status(200).json(employees);

	} catch (error) {
		next(error);
	}
});

// Edit employee
router.put('/staff/:_id/edit', isLoggedIn(), async (req, res, next) => {
	
	const { name, password } = req.body;

	try {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashPass = bcrypt.hashSync(password, salt);
		const updatedEmployee = await Employee.findByIdAndUpdate( 
			req.params._id, 
			{ $set: { name, password: hashPass } }, 
			{ new: true });
		res.status(200).json(updatedEmployee);

	} catch (error) {
		next(error);
	}
});

// Delete employee
router.delete('/staff/:_id/delete', isLoggedIn(), async (req, res, next) => {

	const {_id} = req.params;

	if (!_id) {
		res.status(404).json({ message: 'id not found' });
	}

	try {
		await Employee.findByIdAndDelete({_id});
		await Company.findByIdAndUpdate(
			req.session.currentUser, 
			{ $pull: {employees: _id} },
			{ new: true }
			);

		res.status(200).json({ message: 'Employee deleted' });

	} catch (error) {
		next(error);
	}
});

router.post('/logout', isLoggedInEm(),(req, res, next) => {
	req.session.destroy();
	res.status(204).send();
	return;
});

// si está logueado devuelve un json con los datos del usuario (disponibles en req.session.currentUser)
router.get("/private", isLoggedInEm(), (req, res, next) => {
	
	req.session.currentUser.password = "*";
	res.json(req.session.currentUser);
});

module.exports = router;
// Amalia
// Login de empleados, edit and delete

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Employee = require('../models/Employee');
const Company = require('../models/Company');

const { isLoggedIn, isNotLoggedIn, formFullfilledLogin } = require('../helpers/middlewares');

// Login employee (para acceder al client side)
router.post('/login',  isLoggedIn(), formFullfilledLogin(), async (req, res, next) => {
	// Cuando se loguee tendran que coincidir las keys con algun objeto de los que haya en Company
	const { name, password } = req.body;
	try {
		const user = await Employee.findOne({ name });
		if (!user) {

			next(createError(404));
		} else if (bcrypt.compareSync(password, user.password)) {
			res.status(200).json(user);
		} else {
			next(createError(401));
		}
	} catch (error) {
		next(error);
	}
});




// Employee list
router.get('/staff', isLoggedIn(), async (req, res, next) => {
	// No estoy segura si tendrá que buscarlos con el companyId para que salgan todos los que tiene contratado la empresa
	try {
		const employees = await Employee.find();
		res.status(200).json(employees);
	} catch (error) {
		next(error);
	}
});


router.post('/staff/add', isLoggedIn(), formFullfilledLogin(), async (req, res, next) => {
	// Cuando se loguee tendran que coincidir las keys con algun objeto de los que haya en Company
	const { name, password } = req.body;
	try {
		const user = await Employee.findOne({ name });
		if (user) {
			
			res.json({message: 'User already exists'});
		} else {
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashPass = bcrypt.hashSync(password, salt);
			const newEmployee = await Employee.create({ name, password: hashPass, companyId: req.session.currentUser});
			res.status(200).json(newEmployee)

/* POR FIIIN! ACTUALIZAMOS MODELO COMPANY TRAS AÑADIR, LO USAREMOS EN MUCHAS RUTAS! */
			const companyUpdate=await Company.findByIdAndUpdate(
				req.session.currentUser, 
				{ $push: { employees: newEmployee} }, // En este caso, habrá que hacer el push a Menu para que entre en el array que tiene de dishes?
				{ new: true }
				);
			res.status(200).json(companyUpdate)
		}
	} catch (error) {
		next(error);
	}
});



// Edit employee
router.put('/staff/:_id/edit', isLoggedIn(), async (req, res, next) => {
	console.log('Este req params no mola', req.params._id)
	
	const { name, password } = req.body;
	//console.log(name);
	try {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashPass = bcrypt.hashSync(password, salt);
		const updatedEmployee = await Employee.findByIdAndUpdate( req.params._id, { $set: { name, password: hashPass } }, { new: true });
		res.status(200).json(updatedEmployee);
	} catch (error) {
		next(error);
	}
});

// Delete employee
router.delete('/staff/:_id/delete', isLoggedIn(), async (req, res, next) => {
	const { _id } = req.params;
	if (!_id) {
		res.status(404).json({ message: 'id not found' });
	}
	try {
		await Employee.findByIdAndDelete({ _id });
		await Company.findByIdAndUpdate(
			req.session.currentUser, 
			{ $pull: { employees: _id} }, // En este caso, habrá que hacer el push a Menu para que entre en el array que tiene de dishes?
			{ new: true }
			);
			res.status(200).json({ message: 'Employee deleted' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;

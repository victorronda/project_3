const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Menu = require('../models/Menu');
const Company = require('../models/Company');
const Table = require('../models/Table');
const Dish = require('../models/Dish');

const {isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn())

// Add Table
router.post('/add', async (req, res, next) => {
	const { number, dishes, bill } = req.body;
	
	try {
		const newTable = await Table.create({ number, dishes, bill, companyId: req.session.currentUser });		
		await Company.findByIdAndUpdate(
				req.session.currentUser, 
				{ $push: { tables: newTable} },
				{ new: true }
				);
			res.status(200).json(newTable)
	} catch (error) {
		next(error);
	}
});

// Edit Table
router.put('/:_id/edit', async (req, res, next) => {

	try {
		const editedTable = await Table.findByIdAndUpdate(req.params._id, req.body);
		res.status(200).json(editedTable);
	} catch (error) {
		next(error);
	}
});

// Rastaurar carta para próximo cliente
router.put('menus/:_id/pay', async (req, res, next) => {

try {
    const editedMenu = await Menu.findByIdAndUpdate(req.params._id, req.body);
	res.status(200).json(editedMenu);
        await Table.findByIdAndUpdate(
		req.session.currentUser, 
		{ $pull: { menus: req.body} },
		{ new: true }
		);
	res.status(200).json({ message: 'Menu restored' });
	} catch (err) {
		next(err);
	}
});

// No se si necesitamos otro get para que vuelva a salir la carta o simplemente con la actualizacion anterior ya la tenemos
router.get('menus/:_id', async (req, res, next) => {

try {
	const theClientMenu = await Menu.findById(req.params._id);
	res.status(200).json(theClientMenu);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Menu = require('../models/Menu');
const Company = require('../models/Company');

const { isLoggedIn, isNotLoggedIn, formFullfilled } = require('../helpers/middlewaresAd');
const { isLoggedInEm, isNotLoggedInEm, formFullfilledEm } = require('../helpers/middlewaresEm');

// Menu view (admin)
router.get('/show', async (req, res, next) => {

	try {
		const theClientMenu = await Menu.find();
		res.status(200).json(theClientMenu);

	} catch (err) {
		next(err);
	}
});

// Menu view (client)
router.get('/employee/show', async (req, res, next) => {

	try {
		const theClientMenu = await Menu.find();
		res.status(200).json(theClientMenu);
	} catch (err) {
		next(err);
	}
});

// Add menu
router.post('/add', async (req, res, next) => {

	const { name, dishes } = req.body;
	
	try {
		const newMenu = await Menu.create({ name, dishes, companyId: req.session.currentUser });		
		await Company.findByIdAndUpdate(
			req.session.currentUser, 
			{ $push: { menus: newMenu} },
			{ new: true }
			);
			res.status(201).json(newMenu);

	} catch (error) {
		next(error);
	}
});

// Edit menu
router.put('/:_id/edit', async (req, res, next) => {

	try {
		const editedMenu = await Menu.findByIdAndUpdate(req.params._id, req.body);
		res.status(200).json(editedMenu);

	} catch (error) {
		next(error);
	}
});

// Delete menu
router.delete('/:_id/delete', async (req, res, next) => {

	try {
		const deletedMenu = await Menu.findByIdAndRemove(req.params._id);
		res.json(deletedMenu);

		await Company.findByIdAndUpdate(
		req.session.currentUser, 
		{ $pull: { menus: req.params._id} }, 
		{ new: true }
		);
		res.status(200).json({ message: 'Menu deleted' });

	} catch (error) {
		next(error);
	}
});

module.exports = router;
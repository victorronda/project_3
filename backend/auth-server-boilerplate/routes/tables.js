const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Company = require('../models/Company');
const Table = require('../models/Table');

const { isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn());

// Add Table
router.post('/add', async (req, res, next) => {

	const { numberTables } = req.body;
	
	try {
		for (let i=0;i<numberTables;i++){
		const newTable=await Table.create({number: 0, orders: [], companyId: req.session.currentUser, bill:0});

		await Company.findByIdAndUpdate(
			req.session.currentUser, 
			{ $push: { tables: newTable } },
			{ new: true }
			);
		}	
		res.status(201).json({message: 'Tables created successful'});

	} catch (error) {
		next(error);
	}
});

// Edit table
router.put('/edit', async (req,res,next) => {

	const {numberTables} = req.body;
    Table.collection.drop();

    try {
		await Company.findByIdAndUpdate(
			req.session.currentUser,{ tables: [] },
			{ new: true }
			);

		for (let i=0;i<numberTables;i++){
			const newTable=await Table.create(
			{number: 0, 
			orders: [], 
			companyId: req.session.currentUser,
			bill:0});

		await Company.findByIdAndUpdate(
			req.session.currentUser,
			{ $push: { tables: newTable } },
			{ new: true }
			);
		}	
		res.status(200).json({message: 'Tables created successful'});

	} catch (error) {
		next(error);
	} 
});

// El numero que le pone el employee a la mesa
router.put('/:_id/editNumber', async (req, res, next) => {
	
	try {
		const editTable = await Table.findByIdAndUpdate(
			req.params._id,
			{ number: req.body.number },
			{ new: true }
			);
		res.status(200).json({editTable});

	} catch (err) {
		next(err);
	}
});

/* TODAS LAS MESAS CON PLATOS (CON PEDIDOS) */
router.get('/showAll', async (req,res,next) => {

    try {
        const allTablesWithOrders = await Table.find({orders: {$ne: null}});
		/* Habrá que probar si las trae en el mismo orden 
        que se crearon */
        res.status(200).json(allTablesWithOrders);

	} catch (error) {
		next(error);
    }
});

module.exports = router;
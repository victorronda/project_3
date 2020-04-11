const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Menu = require('../models/Menu');
const Company = require('../models/Company');
const Table = require('../models/Table');
const Dish = require('../models/Dish');
const Order = require('../models/Order');

const { isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn());

// Add Table
router.post('/add', async (req, res, next) => {

	const { numberTables } = req.body;
	
	try {
		for (let i=1;i<=numberTables;i++){
		const newTable=await Table.create({number: i, dishes: [], companyId: req.session.currentUser, bill:0});

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

		for (let i=1;i<=numberTables;i++){
			const newTable=await Table.create(
			{number: i, 
			dishes: [], 
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

/* TODAS LAS MESAS CON PLATOS (CON PEDIDOS) */
router.get('/showAll', async (req,res,next) => {

    try {
        const allTablesWithDishes = await Table.find({dishes: {$ne: null}});
		/* Habrá que probar si las trae en el mismo orden 
        que se crearon */
        res.status(200).json(allTablesWithDishes);

	} catch (error) {
		next(error);
    }
});

/* MANDAR A COCINA LA MESA (EL PEDIDO) */
router.post('/:_id', async (req,res,next) => {

    try{
      	const orderConfirmed = await Company.findByIdAndUpdate(
		  	req.session.currentUser, 
		  	{$push: {tables: req.params._id}}
		  	);
      	res.status(200).json(orderConfirmed);  
    } catch (err) {
        next(err);
    }

});

module.exports = router;
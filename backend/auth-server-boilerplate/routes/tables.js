const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Menu = require('../models/Menu');
const Company = require('../models/Company');
const Table = require('../models/Table');
const Dish = require('../models/Dish');

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
			req.session.currentUser,{ tables: [] } 
			,
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



/* NOS HEMOS QUEDADO POR AQUÍ */

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

/* METER EN LA MESA UN PLATO EN CONCRETO */
// Order the dish
router.post('/:tableId/dish/:dishId', async (req,res,next) => {

	const { quantity } = req.body;

    try {
        const orderedDish = await Dish.findByIdAndUpdate(
			req.params.dishId,
			{$and: [{quantity},
			{$push: {tables: req.params.tableId}}]}
			);
        res.json(orderedDish);
        const updatedTable = await Table.findByIdAndUpdate(
			req.params.tableId,
			{$push: {dishes: req.params.dishId}}
			);
			/* Quizás si no es req.params.dishId pueda usar el orderedDish para {$push: {dishes: orderedDish}}*/   
        res.status(200).json(updatedTable);  

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
        next(err)
    }

})

module.exports = router;
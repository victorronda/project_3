const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Company = require('../models/Company');
const Table = require('../models/Table');

const {isLoggedIn} = require('../helpers/middlewares');
//router.use(isLoggedIn());

// Add Table
router.post('/add', isLoggedIn(), async (req, res, next) => {
	const { number } = req.body;
	console.log("numbeer", number)
	console.log("reeeeq", req.body)
	try {
		for (let i=0;i<number;i++){
		const newTable=await Table.create({number: 0, orders: [], companyId: req.session.currentUser, bill:0});
		
		await Company.findByIdAndUpdate(
			req.session.currentUser, 
			{ $push: { tables: newTable } },
			{ new: true }
			);
		}	
		console.log("number desde fuera", number)
		console.log("req desde fuera", req.session.currentUser)
		res.status(201).json({message: 'Tables created successful'});
		console.log("Tables created!")
	} catch (error) {
		next(error);
	}
});

// Edit table
router.put('/edit', async (req,res,next) => {

	const {number} = req.body;
    Table.collection.drop();

    try {
		await Company.findByIdAndUpdate(
			req.session.currentUser,{ tables: [] },
			{ new: true }
			);

		for (let i=1;i<=number;i++){
			const newTable=await Table.create(
			{number: i, 
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
router.get('/editNumber', async (req, res, next) => {
	console.log('Estoy en el back', req)

	let myTable=JSON.parse(req.query.params)
	
	console.log('Estoy recibiendo el número en el back', myTable)
	try {
		const editTable = await Table.find(
			{ number: myTable.body });
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
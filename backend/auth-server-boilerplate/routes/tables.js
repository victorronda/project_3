const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Table = require('../models/Table');
const Company = require('../models/Company');
const Dish = require('../models/Dish')


const { isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn())



// Añadir y editar mesas --> Añadir (Amalia) y editar (Víctor)














//Editar nº de mesas
router.put('/tables', async (req,res,next) => {
const {numberTables} = req.body


/* Como actualizamos el número de mesas lo que hago es borrar todas las mesas para luego
crear el nuevo array con el número de mesas nuevo . Tiene el inconveniente que si se tiene que editar el nº de mesas,
se tendría que hacer antes de abrir el restaurante porque borra todos los ids y los platos metidos en todas las mesas.
Si se me ocurre otra forma de hacerlo lo intento, pero por ahora es lo que hay...*/
    Table.collection.drop();

    try {
    for (let i=1;i<=numberTables;i++){
        const asManyTablesAsNumberEdit = await Table.create({number: 0, dishes: [], companyId: [], bill:0})
        res.status(200).json(asManyTablesAsNumberEdit)
    }
    } catch (error) {
		next(error);
	} 
})






// Tener en cuenta borrar platos de la mesa con cada cliente (y el imput de la cantidad de platos) --> Amalia



// Renderizar tarjetitas amarillas al admin -->GET que liste todas las mesas con platos --> Víctor

/* TODAS LAS MESAS CON PLATOS (CON PEDIDOS) */
router.get('/showAll', async (req,res,next) => {

    try {
        const allTablesWithDishes = await Table.find({dishes: {$ne: null}}) /* Habrá que probar si las trae en el mismo orden 
        que se crearon */
        res.status(200).json(allTablesWithDishes);
	} catch (error) {
		next(error);
    }

})




/* METER EN LA MESA UN PLATO EN CONCRETO */
//Order the dish
router.post('/:tableId/dish/:dishId', async (req,res,next) => {
const { quantity } = req.body;
    try {
        const orderedDish = await Dish.findByIdAndUpdate(req.params.dishId,{$and: [{quantity},{$push: {tables: req.params.tableId}}]})
        res.json(orderedDish);
        const updatedTable = await Table.findByIdAndUpdate(req.params.tableId,{$push: {dishes: req.params.dishId}})   
        res.status(200).json(updatedTable);   
	} catch (error) {
		next(error);
    }

})


/* MANDAR A COCINA LA MESA (EL PEDIDO) */
router.post('/:_id', async (req,res,next) => {

    try{
      const orderConfirmed = await  Company.findByIdAndUpdate( req.session.currentUser, {$push: {tables: req.params._id}})
      res.status(200).json(orderConfirmed);  
    } catch (err) {
        next(err)
    }

})












module.exports = router;
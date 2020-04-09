// Victor --> Cambiar los errores a (error) => next(createError(404)) por ejemplo

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Menu = require('../models/Menu');
const Company = require('../models/Company');


// HELPER FUNCTIONS -> me lo he traído por si acaso, creo que no es necesario así luego borrar si eso
const { isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn())

// Añadir, editar y borrar cartas

//Añadimos una carta nueva (new Menu)
router.post('/add', async (req, res, next) => {
	const { name, dishes } = req.body;
	
	try {
		const newMenu = await Menu.create({ name, dishes, companyId: req.session.currentUser });		
		await Company.findByIdAndUpdate(
				req.session.currentUser, 
				{ $push: { menus: newMenu} }, // En este caso, habrá que hacer el push a Menu para que entre en el array que tiene de dishes?
				{ new: true }
				);
			res.status(200).json(newMenu)
	} catch (error) {
		next(error);
	}
});

//Editamos una carta (edit Menu)
router.put('/:_id/edit', async (req, res, next) => {

	try {
		const editedMenu = await Menu.findByIdAndUpdate(req.params._id, req.body);
		res
			.status(200) //  OK
			.json(editedMenu);
	} catch (error) {
		next(error);
	}
});

//Eliminamos una carta (delete Menu)
router.delete('/:_id/delete', async (req, res, next) => {

	try {
		const deletedMenu = await Menu.findByIdAndRemove(req.params._id);
		res.json(deletedMenu); //OK
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



//MENU CLIENTE -- Realmente las cantidades se ponen en el plato de la mesa, no en el menú.

/* Aquí mostramos el menu que hayamos seleccionado. OJO!! Si hay varias cartas creadas, ¿dónde seleccionamos la que estárá o
estarán visibles a los clientes? Supongo que en MenuClientView pero habrá que cambiar la vista en caso de que hayan 
más de una carta disponible */


//Ver el menú tanto como admin como cliente
router.get('/:_id', async (req, res, next) => {
	/* Siempre valido si esta logeado ( isLoggedIn() ) ya que sino cualquier persona que escribiera la ruta /menu/client en su 
navegador podría entrar */

try {
	const theClientMenu = await Menu.findById(req.params._id);
		res
			.status(200) //OK
			.json(theClientMenu);
	} catch (err) {
		next(err);
	}
});



module.exports = router;

// Victor --> Cambiar los errores a (error) => next(createError(404)) por ejemplo

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Menu = require('../models/Menu');


// HELPER FUNCTIONS -> me lo he traído por si acaso, creo que no es necesario así luego borrar si eso
const { isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn())

// Añadir, editar y borrar cartas

//Añadimos una carta nueva (new Menu)
router.post('/menu/add', async (req, res, next) => {
	const { name, plates } = req.body;
	
	const newMenu = await Menu.create({ name, plates, companyId: req.session.currentUser });
	try {
		res
			.status(200) //  OK
			.json(newMenu);
	} catch (error) {
		next(error);
	}
});

//Editamos una carta (edit Menu)
router.put('/menu/:idMenu', async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' }); //Ya veremos si finalmente se renderizaría este error así y donde
		return;
	}

	const editedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body);
	try {
		res
			.status(200) //  OK
			.json(editedMenu);
	} catch (error) {
		next(error);
	}
});

//Eliminamos una carta (delete Menu)
router.delete('/menu/:idMenu', async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' }); //Ya veremos si finalmente se renderizaría este error así y donde
		return;
	}

	const deletedMenu = await Menu.findByIdAndRemove(req.params.id);
	try {
		res
			.status(200) //  OK
			.json(deletedMenu);
	} catch (error) {
		next(error);
	}
});

// Tener en cuenta ambas partes, cliente (cantidades) y admin (platos)






//MENU CLIENTE -- Realmente las cantidades se ponen en el plato de la mesa, no en el menú.

/* Aquí mostramos el menu que hayamos seleccionado. OJO!! Si hay varias cartas creadas, ¿dónde seleccionamos la que estárá o
estarán visibles a los clientes? Supongo que en MenuClientView pero habrá que cambiar la vista en caso de que hayan 
más de una carta disponible */

router.get('/menu/client/:idMenu', async (req, res, next) => {
	/* Siempre valido si esta logeado ( isLoggedIn() ) ya que sino cualquier persona que escribiera la ruta /menu/client en su 
navegador podría entrar */
	if (!mongoose.Types.ObjectId.isValid(req.params.idMenu)) {
		res.status(400).json({ message: 'Specified id is not valid' }); //Ya veremos si finalmente se renderizaría este error así y donde
		return;
	}

	const theClientMenu = await Menu.findById(req.params.idMenu);
	try {
		res
			.status(200) //OK
			.json(theClientMenu);
	} catch (err) {
		next(err);
	}
});




//MENU ADMIN 
/* Cuando veamos el listado de todos las cartas(menus) y queramos seleccionemos uno en concreto */


router.get('/menu/admin/:idMenu', async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.idMenu)) {
		res.status(400).json({ message: 'Specified id is not valid' }); //Ya veremos si finalmente se renderizaría este error así y donde
		return;
    }
    
    const adminMenu = await Menu.findById(req.params.idMenu);
	try {
		res
			.status(200) //OK
			.json(adminMenu);
	} catch (err) {
		next(err);
	}
});






/* Cuando veamos todo el listado de los menús (cartas) que hemos creado */
router.get('/menu/admin', isLoggedIn(), async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.idMenu)) {
		res.status(400).json({ message: 'Specified id is not valid' }); //Ya veremos si finalmente se renderizaría este error así y donde
		return;
    }
    
    const allAdminMenus = await Menu.find()
                                .populate('plates')
                                .populate('companyId');
	try {
		res
			.status(200) //OK
			.json(allAdminMenus);
	} catch (err) {
		next(err);
	}
});




module.exports = router;

// Victor

const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Company = require("../models/Company");
const Employee = require("../models/Employee");

// HELPER FUNCTIONS -> me lo he traído por si acaso, creo que no es necesario así luego borrar si eso
const {
    isLoggedIn,
    isNotLoggedIn,
    validationLogginCompany
  } = require("../helpers/middlewares");


// Añadir, editar y borrar cartas

//Añadimos una carta nueva (new Menu)
router.post('/menu/add', isLoggedIn(), async (req,res, next) => {
    const { name, plates } = req.body;
    req.session.currentUser = theCompanyID;
    try{
        const newMenu = await Menu.create({name, plates, companyId: theCompanyID})
        res
          .status(200) //  OK
          .json(newMenu);
    } catch (error) {
        next(error);
      }
})


//Editamos una carta (edit Menu)
router.put('/menu/:idMenu', isLoggedIn(), async (req,res, next) => {
   
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' }) //Ya veremos si finalmente se renderizaría este error así y donde
        return;
      }

    try{
        const editedMenu = await Menu.findByIdAndUpdate( req.params.id, req.body )
        res
          .status(200) //  OK
          .json(editedMenu);
    } catch (error) {
        next(error);
      }
})


//Eliminamos una carta (delete Menu)
router.delete('/menu/:idMenu', isLoggedIn(), async (req,res, next) => {
   
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' }) //Ya veremos si finalmente se renderizaría este error así y donde
    return;
  }

try{
    const deletedMenu = await Menu.findByIdAndRemove( req.params.id )
    res
      .status(200) //  OK
      .json(deletedMenu);
} catch (error) {
    next(error);
  }
})





// Tener en cuenta ambas partes, cliente (cantidades) y admin (platos)






module.exports = router;
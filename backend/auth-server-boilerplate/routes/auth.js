// Victor
// Signup, login, logout
const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Company = require("../models/Company");
const Employee = require("../models/Employee");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogginCompany
} = require("../helpers/middlewares");

//  POST '/signup'

router.post(
  "/signup",
  // revisamos si el usuario como "Company" no está ya logueado usando la función helper (chequeamos si existe req.session.currentUser)
  isNotLoggedIn(),
  // revisa que se hayan completado los valores de name, email y password usando la función helper
  validationLogginCompany(),
  async (req, res, next) => {
    const { name, password, email } = req.body;

    try {
      // chequea si el name de la Company ya existe en la BD
      const companyExists = await Company.findOne({ name }, "name");
      // si la compañía ya existe, pasa el error a middleware error usando next()
      if (companyExists) return next(createError(400));
      else {
        // en caso contrario, si la compañía no existe, hace hash del password y crea una nueva compañía en la BD
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newCompany = await Company.create({ name, email, password: hashPass });
        // luego asignamos el nuevo documento company a req.session.currentUser y luego enviamos la respuesta en json
        req.session.currentUser = newCompany;
        res
          .status(200) //  OK
          .json(newCompany);
      }
    } catch (error) {
      next(error);
    }
  }
);


//  POST '/login/admin'

// chequea que el usuario como "Company" (admin) no esté logueado usando la función helper (chequea si existe req.session.currentUser)
// revisa que el name y el password se estén enviando usando la función helper
router.post(
    "/login/admin",
    isNotLoggedIn(),
    validationLogginCompany(),
    async (req, res, next) => {
      const { name, password } = req.body;
      try {
        // revisa si la compañía existe en la BD
        const company = await Company.findOne({ name });
        // si la compañía no existe, pasa el error al middleware error usando next()
        if (!company) {
          next(createError(404));
        }
        // si la compañía existe, hace hash del password y lo compara con el de la BD
        // loguea al admin(company) asignando el document a req.session.currentUser, y devuelve un json con el user
        else if (bcrypt.compareSync(password, company.password)) {
          req.session.currentUser = company;
          res.status(200).json(company);
          return;
        } else {
          next(createError(401));
        }
      } catch (error) {
        next(error);
      }
    }
  );


  // POST '/logout'

// revisa si el usuario        (Company o Employee)        está logueado usando la función helper (chequea si la sesión existe), y luego destruimos la sesión
router.post("/logout", isLoggedIn(), (req, res, next) => {
    req.session.destroy();
    //  - setea el código de estado y envía de vuelta la respuesta
    res
      .status(204) //  No Content
      .send();
    return;
  });



  module.exports = router;
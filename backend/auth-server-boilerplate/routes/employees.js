// Amalia
// Login de empleados, edit and delete

const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const Employee = require("../models/Employee");
const Company = require("../models/Company");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/middlewares")

// Login employee (para acceder al client side)
router.post("/login", isNotLoggedIn(), async (req, res, next) => { // Cuando se loguee tendran que coincidir las keys con algun objeto de los que haya en Company
  const { name, password } = req.body;
  try {
    const user = await Employee.findOne({ name })
      if (!user) {
        next(createError(404));
      }
      else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
      }
      else {
        next(createError(401));
      }
  }
  catch (error) {
    next(error)
  }
});

// Employee list
router.get('/staff', isLoggedIn(), async (req, res, next) => { // No estoy segura si tendrá que buscarlos con el companyId para que salgan todos los que tiene contratado la empresa
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

// Edit employee
router.put("/:_id/edit", isLoggedIn(), async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { name, password } = req.body;
  //console.log(name);
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(_id, 
    { $push: { name, password } },
    { new: true },
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

// Delete employee 
router.delete("/:_id/delete", async (req, res, next) => { // o staff/:_id/delete???????
    const { _id } = req.params;
    if (!_id) {
      res.status(404).json({message: 'id not found'});
    }
    try {
      await Employee.findByIdAndDelete({ _id });
      res.status(200).json({ message: 'Employee deleted' });
    } catch (error) {
      next(error);
    }
})

module.exports = router;

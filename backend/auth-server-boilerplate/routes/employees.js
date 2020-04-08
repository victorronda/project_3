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

router.get("/me", isLoggedIn(), async (req, res, next) => { // Traemos el id del empleado y lo buscamos dentro de la empresa
  const { _id } = req.session.currentUser;
  const user = await Company.findById({_id}).populate("employees");
  user.password = "******";
  res.json(user);
})

router.post("/login", isNotLoggedIn(), async (req, res, next) => { // Cuando se loguee tendran que coincidir las keys con algun objeto de los que haya en Company
  const { name, password } = req.body;
  try {
    const user = await Employee.findOne({ name }).populate("employees");

    if (!user) {
      next(createError(404));
    }

    else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res
        .status(200)
        .json(user)
    }
    else {
      next(createError(401));
    }
  }
  catch (error) {
    next(error)
  }
})

router.get("/:companyId", isLoggedIn(), async (req, res, next) => { // Editamos y borramos en base al Id que nos dara mongo o al de companyId?
  const { companyId } = req.params;
  const user = await Company.findById({ "_id": companyId }).populate("employees");

  res.json(user)
})

router.put("/edit", isLoggedIn(), async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { name } = req.body;
  console.log(name);
  let updatedUser;
  if (name) {
    updatedUser = await Employee.findByIdAndUpdate({ _id }, { $set: { name } }, { new: true })
}

router.delete("/:_id", async (req, res, next) => { // Aquí si estoy más segura de que el Id que le crea mongo es del que tiraremos para borrarlo
    const { _id } = req.params
    const del = await Employee.findByIdAndDelete({ "_id": _id })
    const employeesUpdated = await Employee.find({ "user": req.session.currentUser._id })

    req.session.currentUser.Employees = employeesUpdated;
    res.json(req.session.currentUser);
})

// Con esta ruta comprobamos en postman
router.get('/private', isLoggedIn(), (req, res, next) => { 
  res
    .status(200)
    .json({ message: 'Test - User is logged in' });
});
  res.json(updatedUser)
})

module.exports = router;

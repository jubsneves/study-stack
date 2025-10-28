const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");
const studentsController = require("./src/controllers/studentsController");

const { loginRequired } = require("./src/middlewares/middleware");

//Home
route.get("/", homeController.index);

//Login
route.get("/login", loginController.index);
route.post("/login", loginController.loginUser);

//Register
route.get("/register", registerController.index);
route.post("/register", registerController.registerUser);

route.get("/logout", loginController.logout);

//Adding students
route.get("/students", loginRequired, studentsController.index);
route.post("/addstudent", loginRequired, studentsController.addstudent);
route.get("/student/index/:id", loginRequired, studentsController.editIndex);
route.post("/student/edit/:id", loginRequired, studentsController.edit);

module.exports = route;

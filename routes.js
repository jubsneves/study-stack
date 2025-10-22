const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");

//Route to home
route.get("/", homeController.homePage);

module.exports = route;

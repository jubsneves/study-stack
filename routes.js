// const express = require("express");
// const route = express.Router();
// const homeController = require("./src/controllers/homeController");
// const contactController = require("./src/controllers/contactController");

// console.log("🏠 homeController importado:", homeController);

// route.get(
//   "/",
//   (req, res, next) => {
//     console.log("🔹 GET / route hit!");
//     next();
//   },
//   homeController.homePage
// );

// route.post("/", homeController.handlePost);

// route.get("/contact", contactController.contact);

// module.exports = route;

const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const contactController = require("./src/controllers/contactController");

//Route to home
route.get("/", homeController.homePage);
route.post("/", homeController.handlePost);

//Route to Contact
route.get("/contact", contactController.contact);

module.exports = route;

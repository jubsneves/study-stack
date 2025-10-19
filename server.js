// console.log("✅ Routes loaded from routes.js");

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.CONNECTIONSTRING)
//   .then(() => {
//     console.log("Connected to database");
//     // app.emit("ready");
//   })
//   .catch((e) => console.log(e));

// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");

// const routes = require("./routes");
// const path = require("path");
// const { middleWareGlobal } = require("./src/middlewares/middleware");

// app.use(express.urlencoded({ extended: true }));

// app.use(express.static("./public"));

// const sessionOptions = session({
//   secret: "123456789",
//   store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//     httpOnly: true,
//   },
// });
// app.use(sessionOptions);
// app.use(flash());

// app.set("views", path.resolve(__dirname, "src", "views"));
// app.set("view engine", "ejs");
// app.use(routes);

// // app.on("ready", () => {
//   app.listen(3000, () => {
//     console.log("Run on port http://localhost:3000");
//   });
// // });


require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const path = require("path");

const { middleWareGlobal } = require("./src/middlewares/middleware");
const routes = require("./routes");

// Middleware read the form
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

// Session and Flash
const sessionOptions = session({
  secret: "123456789",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
});
app.use(sessionOptions);
app.use(flash());

//Global Middleware
app.use(middleWareGlobal);

// Conf views
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Routes
console.log("✅ Routes loaded from routes.js");
app.use(routes);

// MongoDB + server
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("✅ Connected to database");
    app.listen(3000, () =>
      console.log("🚀 Server running at http://localhost:3000")
    );
  })
  .catch((e) => console.log("❌ MongoDB connection error:", e));

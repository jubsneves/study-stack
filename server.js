require("dotenv").config();
const express = require("express");
const app = express();
//Mongoose: define schemas and interact with MongoDB database
const mongoose = require("mongoose");
//Session: manage user sessions, enabling login states and session data storage via cookie
const session = require("express-session");
//MongoStore: stores user sessions in MongoDB so they stay saved even if the server restarts
const MongoStore = require("connect-mongo");
//Flash: stores messages in MongoDB to show temporary notifications to users
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
//Helmet: security middleware for Node that helps protect app by setting various HTTP to secure it from common web vulnerabilities
const helmet = require("helmet");
//CSRF: is an attack where malicious sites trick users into submitting unwanted actions on a different site where they're authenticated
const csrf = require("csurf");
//Middlewares: runs between a user's request and website's response, checking permissions or processing data before the page loads
const {
  middleWareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

app.use(helmet());
//urlencoded: Handle form data submitted by users
app.use(express.urlencoded({ extended: true }));
//express.json: Handle data sent in JSON format
app.use(express.json());
// Serve files like images, CSS, and JS from the 'public' folder
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

app.use(csrf());
//My Middlewares
app.use(middleWareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// Conf views
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

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

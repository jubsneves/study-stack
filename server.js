require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("conectei a base de dados");
    app.emit("ready");
  })
  .catch((e) => console.log(e));

const routes = require("./routes");
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

// app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(routes);

app.on("ready", () => {
  app.listen(3000, () => {
    console.log("Run on port http://localhost:3000");
  });
});

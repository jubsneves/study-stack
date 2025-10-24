const Login = require("../models/loginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("logged");
  return res.render("login");
};

exports.loginUser = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Welcome to CRUDStudent");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/login");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};

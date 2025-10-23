const Register = require("../models/registerModel");

exports.index = (req, res) => {
  res.render("register");
};

// exports.registerUser = async (req, res) => {
//   try {
//     const register = new Register(req.body);
//     await register.register();

//     if (register.errors.length > 0) {
//       req.flash("errors", register.errors);
//       //saving section
//       req.session.save(function () {
//         return res.redirect("/register");
//       });
//       return;
//     }

//     req.flash("Success", "Your account was created🥳");
//     //saving section
//     req.session.save(function () {
//       return res.redirect("/register");
//     });

//     return res.send(register.errors);
//   } catch (e) {
//     console.log(e);
//     return res.render("404");
//   }
// };


exports.registerUser = async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.register();

    if (register.errors.length > 0) {
      req.flash("errors", register.errors);
      req.session.save(() => res.redirect("/register"));
      return;
    }

    req.flash("success", "Your account was created 🥳");
    req.session.save(() => res.redirect("/register"));
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
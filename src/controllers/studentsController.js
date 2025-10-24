const Student = require("../models/StudentModel");

exports.index = (req, res) => {
  res.render("students");
};

exports.addstudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.add();

    if (student.errors.length > 0) {
      req.flash("errors", student.errors);
      req.session.save(() => res.redirect("/students"));
      return;
    }

    req.flash("success", "Student has been added successfully!");
    req.session.save(() => res.redirect("/students"));
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

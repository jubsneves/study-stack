const Student = require("../models/StudentModel");

exports.index = async (req, res) => {
  try {
    const formData = req.session.formData || {};
    delete req.session.formData;

    const students = await Student.findStudents();

    res.render("students", {
      student: formData,
      csrfToken: req.csrfToken(),
      messages: req.flash(),
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
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
    req.session.save(() => res.redirect("/"));
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const student = await Student.findId(req.params.id);
  if (!student) return res.render("404");

  res.render("students", { student });
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.render("404");
    const student = new Student(req.body);
    await student.edit(req.params.id);

    if (student.errors.length > 0) {
      req.session.formData = req.body;
      req.flash("errors", student.errors);
      req.session.save(() => res.redirect("/students"));
      return;
    }

    req.flash("success", "Student has been edit successfully!");
    req.session.save(() => res.redirect("/"));
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const student = await Student.delete(req.params.id);
  if (!student) return res.render("404");

  req.flash("success", "Student has been delete successfully");
  req.session.save(() => res.redirect("/"));
};

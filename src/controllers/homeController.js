const Student = require("../models/StudentModel");

exports.index = async (req, res) => {
  const students = await Student.findStudents();
  res.render("index", { students });
};


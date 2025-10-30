const mongoose = require("mongoose");
const validator = require("validator");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  admission: { type: Date, default: Date.now },
});

const StudentModel = mongoose.model("student", StudentSchema);

class Student {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.students = null;
  }
}

Student.prototype.add = async function () {
  this.validate();

  if (this.errors.length > 0) return;
  this.students = await StudentModel.create(this.body);
};

Student.prototype.validate = function () {
  this.cleanUp();

  if (!this.body.name) this.errors.push("Name is required");
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("Please enter a valid email address");
  if (!this.body.phone) this.errors.push("Phone is required");
  if (!this.body.course) this.errors.push("Course is required");
};

Student.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    email: this.body.email,
    phone: this.body.phone,
    course: this.body.course,
  };
};

Student.prototype.edit = async function (id) {
  if (typeof id !== "string") return;
  this.validate();
  if (this.errors.length > 0) return;
  this.students = await StudentModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

Student.findId = async function (id) {
  if (typeof id !== "string") return;
  const student = await StudentModel.findById(id);
  return student;
};

Student.findStudents = async function () {
  const students = await StudentModel.find().sort({ admission: -1 });
  return students;
};

Student.delete = async function (id) {
  if (typeof id !== "string") return;
  const student = await StudentModel.findByIdAndDelete(id);
  return student;
};

module.exports = Student;

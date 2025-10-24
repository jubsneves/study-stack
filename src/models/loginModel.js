const bcryptjs = require("bcryptjs");
const Register = require("./registerModel");
const mongoose = require("mongoose");

const RegisterModel = mongoose.models.Register;

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    if (this.errors.length > 0) return;
    this.user = await RegisterModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Invalid email or password");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Invalid email or password");
      this.user = null;
      return;
    }
  }
}

module.exports = Login;

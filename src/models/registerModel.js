const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const RegisterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.models.Register || mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await RegisterModel.create(this.body);
  }

  async userExists() {
    const user = await RegisterModel.findOne({ email: this.body.email });
    if (user) this.errors.push("An account with this email already exist. ");
  }

  validate() {
    this.cleanUp();
    //check if email is valid
    if (!validator.isEmail(this.body.email))
      this.errors.push("Please enter a valid email address");

    //password min length
    if (this.body.password.length < 10 || this.body.password > 30) {
      this.errors.push("Password must be at least 10 characters long");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Register;

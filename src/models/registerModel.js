const mongoose = require("mongoose");
const validator = require("validator");

const RegisterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    try {
      this.user = await RegisterModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
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

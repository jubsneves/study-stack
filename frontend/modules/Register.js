import validator from "validator";

export default class Register {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("HEEEY");
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      alert("Email is invalid");
      error = true;
    }

    if (passwordInput.value.length < 10 || passwordInput.value.length > 30) {
      alert("Password must have between 10 - 30 characters");
      error = true;
    }

    if (!error) el.submit();

    console.log(emailInput.value, passwordInput.value);
  }
}

// window.Register = Register;

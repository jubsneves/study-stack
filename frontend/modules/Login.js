import validator from "validator";

export default class Login {
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
      this.validate(e);
    });
  }

  helpTextDiv(input, msg) {
    let existingHelpText = input.nextElementSibling;

    if (existingHelpText && existingHelpText.classList.contains("help-text")) {
      existingHelpText.textContent = msg;
      return;
    }

    const helpTextEl = document.createElement("div");
    helpTextEl.className = "help-text";
    helpTextEl.textContent = msg;

    input.insertAdjacentElement("afterend", helpTextEl);
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      this.helpTextDiv(emailInput, "Email is invalid");
      emailInput.classList.add('error');
      error = true;
    }

    if (passwordInput.value.length < 10 || passwordInput.value.length > 30) {
      this.helpTextDiv(passwordInput, "Password is invalid");
      passwordInput.classList.add("error");
      error = true;
    }

    if (!error) el.submit();

    console.log(emailInput.value, passwordInput.value);
  }
}

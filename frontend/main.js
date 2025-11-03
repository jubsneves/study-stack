import "core-js/stable";
import "regenerator-runtime/runtime";
import "./css/style.css";

import Login from "./modules/Login";
import Register from "./modules/Register";

const login = new Login(".login-form");
const register = new Register(".register-form");

login.init();
// register.init();

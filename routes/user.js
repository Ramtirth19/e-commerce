const app = require('express').Router();
const { register, login, changePassword } = require('../controllers/userCredential');
const auth = require('../middlewares/tokenAuth')

app.post("/register", register)
app.post("/login", login);
app.post("/changePassword", changePassword)
// app.post("changePassword", controller.changePassword);

module.exports = app;
const app = require('express').Router();
const { getProduct, addProduct } = require('../controllers/productController');
// const auth = require('../middlewares/tokenAuth')

app.get("/getProduct", getProduct)
app.post("/addProduct", addProduct);
// app.post("/changePassword", changePassword)
// app.post("changePassword", controller.changePassword);

module.exports = app;
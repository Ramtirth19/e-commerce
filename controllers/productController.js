const mongoose = require('mongoose');
const productModel = require('../models/productModel');
const validator = require('../middlewares/productValidation');

const product = mongoose.model("product", productModel);

const getProduct = async (req, res, next) => {
    let data = await product.find();
    res.send(data);
}

const addProduct = async (req, res, next) => {
    try {
        let data = req.body;
        console.log(data);
        let newProduct = new product(data);

        [validTitle, validUrl, validPrice] = [validator.validateTitle(data.name),
        validator.validateUrl(data.image),
        validator.validatePrice(data.price)];

        let errors = [validTitle, validUrl, validPrice].filter(item => item != true)

        if (errors.length > 0) {
            res.json({
                message: "Errors occurred!",
                error: errors
            });
            throw new Error(errors);
        } else {
            console.log(newProduct);
            let result = await newProduct.save();
            res.send(result);
        }
    } catch (err) {
        res.json({
            message: "Error occurred while adding this product",
            error: err.message
        });
        throw new Error(err.message);
    }
}

const editProduct = async (req, res, next) => {
    let data = req.body;
}

module.exports = { getProduct, addProduct };
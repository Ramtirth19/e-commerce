const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    "name": {
        type: String,
        required: [true, "Please enter a title for the product"],
        unique: true
    },
    "brand": {
        type: String,
        required: [true, "Please enter a brand name for the product"]
    },
    "image": {
        type: String,
        required: [true, "Please add a image for the product"]
    },
    "desc": {
        type: String,
        required: [true, "Please add a description for the product"]
    },
    "price": {
        type: Number,
        required: [true, "Please enter a price for the product"]
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = productModel;
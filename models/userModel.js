const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    "username": {
        type: String,
        validate: {
            validator: (v) => {
                return (/^[a-zA-Z ]{2,30}$/).test(v);
            },
            message: "Enter a valid username"
        },
        required: [true, "Please enter your full name"]
    },
    "email": {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(v);
            },
            message: "Enter a valid email address"
        },
        required: [true, "Please enter an email address"]
    },
    "phone": {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return (/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(v);
            },
            message: "Please enter a valid mobile number"
        },
        required: [true, "Please enter a phone number"]
    },
    "password": {
        type: String,
        required: [true, "Please enter a password"]
    },
    "isAdmin": {
        type: Boolean,
        default: false
    },
    "isActive": {
        type: Boolean,
        default: true
    },
    "token": {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = userModel;
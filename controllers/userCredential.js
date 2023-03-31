//-----------------------------------------importing required modules---------------------------------------------------
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('../middlewares/validation');

//------------------------------------------creating table in database---------------------------------------------------
const user = mongoose.model("User", userModel);

//------------------------------------------Sign up function------------------------------------------------
const register = async (req, res, next) => {

    console.log(req.body)

    try {

        let data = req.body;
        let newUser = await new user(data);
        //-----------------------------------validating data before saving------------------------------------------------

        [validName, validPass, confirmPass, validEmail, validPhone] = [validator.validateName(data.username),
        validator.validatePassword(data.password),
        validator.confirmPassword(data.password, data.confirmPassword),
        validator.validateEmail(data.email),
        validator.validatePhone(data.phone)];

        let errors = [validName, validEmail, validPhone, validPass].filter(item => item != true);

        if (errors.length > 0) {
            res.json({
                message: "Sign up failed!",
                error: errors
            })
        }
        else {
            encryptedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = encryptedPassword;

            let result = await newUser.save();
            let email = result.email;

            //---------------------------------------------generating token-----------------------------------------------------------            
            const token = jwt.sign(
                { user_id: result._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            result.token = token;

            res.json({
                message: "Signed up successfully!",
                Credentials: result
            });
        }

    } catch (err) {
        res.status(500).send(err.message);
        // res.json({
        //     message: "Sign up failed!",
        //     error: err.message
        // })
    }
}

//------------------------------------------Sign in function------------------------------------------------

const login = async (req, res, next) => {
    try {
        let loginEmail = req.body.email.toLowerCase();
        let currentUser = await user.findOne({ email: loginEmail });

        if (currentUser) {

            if (await bcrypt.compare(req.body.password, currentUser.password)) {

                const token = jwt.sign({ user_id: currentUser._id, loginEmail }, process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }
                );
                currentUser.token = token;
                if (currentUser.isAdmin == true) {
                    try {
                        let allUsers = await user.find();
                        res.json({
                            message: "Welcome administrator",
                            userLogs: allUsers
                        });
                    } catch (err) {
                        res.json({
                            message: err.message
                        });
                    }
                } else {
                    res.json({
                        message: "Logged in successfully",
                        data: currentUser
                    });
                }
            } else {
                res.json({
                    message: "Login failed",
                    error: "Incorrect password"
                });
            }
        } else {
            res.json({
                error: "Email id doesn't exist",
                message: "Please sign up to access .."
            });
            throw new Error("Email id doesn't exist. Please sign up to log in");
        }
    } catch (err) {
        res.json({
            message: err.message
        });
    }
}

const changePassword = async (req, res, next) => {
    let email = req.body.email;
    let editUser = await user.findOne({ "email": email })
    console.log(editUser)
    if (editUser) {
        let id = editUser.id,
            newPass = req.body.newPassword,
            oldPass = req.body.oldPassword,
            verifyPass = await bcrypt.compare(oldPass, editUser.password);

        if (verifyPass) {

            if (newPass != oldPass) {
                validPass = validator.validatePassword(req.body.newPassword)

                if (validPass == true) {

                    let encryptedPassword = await bcrypt.hash(newPass, 10);
                    editUser.password = encryptedPassword;
                    let result = await user.findByIdAndUpdate(id, editUser);
                    res.status(200).json({
                        message: "Password changed successfully"
                    });

                } else {
                    res.json({
                        message: "Failed!",
                        error: validPass
                    });
                }
            } else {
                res.json({
                    error: "Old password and new password can not be same"
                });
            }
        } else {
            res.json({
                error: "Incorrect old password"
            });
        }
    } else {
        res.json({
            error: "User doesn't exist"
        });
    }
}

module.exports = { register, login, changePassword };
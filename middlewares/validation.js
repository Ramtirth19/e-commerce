const isEmpty = (field) => {
    if (!field) return false;
    else return true;
}

const confirmPassword = (password, confirmPassword) => {
    if (confirmPassword != password) return "Password and confirm password fields must be same";
    else return true;
}

const validatePassword = (password) => {
    let checkEmpty = isEmpty(password);
    if (checkEmpty) {

        if (!(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,}$/).test(password)) {
            return (`Please enter a valid password. Password must contain: 
            at least 8 characters 
            a lowercase letter 
            an uppercase letter 
            a special character 
            and a number`);
        }
        return true;
    }
    return "Password and confirm password fields can not be empty";
}

const validateName = (name) => {
    let checkEmpty = isEmpty(name);
    if (checkEmpty) {
        if (!(/^[a-zA-Z ]{2,30}$/).test(name)) {
            return "Please enter a valid name";
        }
        return true;
    }
    return "Name can not be empty";
}

const validateEmail = (email) => {
    let checkEmpty = isEmpty(email);
    if (checkEmpty) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            return "Please enter a valid email address";
        }
        return true;
    }
    return "Email can not be empty";
}

const validatePhone = (phone) => {
    let checkEmpty = isEmpty(phone);
    if (checkEmpty) {
        if (!(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(phone)) {
            return "Please enter a valid phone number";
        }
        return true;
    }
    return "Phone number can not be empty";
}

module.exports = { validateName, validatePassword, validateEmail, validatePhone, confirmPassword };
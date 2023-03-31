const isEmpty = (field) => {
    if (!field) return false;
    else return true;
}

const validate = (data) => {
    console.log(data)
  let { username, email, phone, password, confirmPassword } = data
    let err = [];

    if(password != confirmPassword) err.push("Password and confirm password do not match!");    
    else err.push(true);


    let isEmptyPass = isEmpty(password);
    if (isEmptyPass) {
        if (!(/^(?=.*[0-9])(?=.*[- z?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,}$/).test(password))
            err.push(`Please enter a valid password. Password must contain: 
            at least 8 characters 
            a lowercase letter 
            an uppercase letter 
            a special character 
            and a number`);
        else err.push(true);
    } else err.push("Password can not be empty");

    let isEmptyName = isEmpty(username);
    if (isEmptyName) {
        if (!(/^[a-zA-Z ]{2,30}$/).test(username)) {
            err.push("Please enter a valid name");
        } else err.push(true);
    } else err.push("Name can not be empty");

    let isEmptyEmail = isEmpty(email);
    if (isEmptyEmail) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email))
            err.push("Please enter a valid email address");
        else err.push(true);
    } else err.push("Email can not be empty");

    let isEmptyPhone = isEmpty(phone);
    if (isEmptyPhone) {
        if (!(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(phone))
            err.push("Please enter a valid phone number");
        else err.push(true);
    } else err.push("Phone number can not be empty");

    return err.filter(item => item != true);
}

module.exports = { validate };
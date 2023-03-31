const isEmpty = (field) => {
    if (!field) return false;
    else return true;
}

const validateTitle = (title) => {
    let checkEmpty = isEmpty(title);
    if (checkEmpty) {
        if (!(/^[a-zA-Z ]{2,30}$/).test(title)) {
            return "Please enter a valid title";
        }
        return true;
    }
    return "Title can not be empty";
}

const validateUrl = (url) => {
    let checkEmpty = isEmpty(url);
    if (checkEmpty) {

        if (!(/^([a-zA-Z]+:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i).test(url)) {
            return "Please enter a valid image url";
        }
        return true;
    }
    return "Image url can not be empty";
}

const validatePrice = (price) => {
    let checkEmpty = isEmpty(price);
    if (checkEmpty) {

        if (!(/^\d+$/).test(price)) {
            return "Please enter a valid price for the product";
        }
        return true;
    }
    return "Price can not be empty";
}

module.exports = {validateTitle, validateUrl, validatePrice}
function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePhone(phone) {
    const isNumber = /^\d+$/.test(phone);
    return phone.length === 11 && isNumber;
}

function validateUsername(username) {
    return username.length >= 5;
}

module.exports = {
    validateEmail,
    validatePhone,
    validateUsername
}
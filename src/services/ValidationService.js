export function validateEmail() {
    return [
        (value) => !!value || 'Email is required',
        (value) => isValidEmail(value) || 'Incorrect email address',
    ];
}

export function validatePassword() {
    return [
        (value) => !!value || 'Password is required',
        (value) => (value && value.length > 5) || 'Password must contain at least 6 characters',
        (value) => isValidPassword(value) || 'Password must contain letters and numbers',
    ];
}

export function validateCountry(countries) {
    return [
        (value) => !!value || 'Country is required',
        (value) => countries.includes(value) || 'Incorrect country. Please, choose country from list',
    ];
}

export function validateName() {
    return [
        (value) => !!value || 'Enter data in the field',
        (value) => (value && value.length > 1) || 'Enter correct data',
        (value) => isNoDigitInName(value) || 'Number are not allowed',
    ];
}

export function validateUsername() {
    return [
        (value) => !!value || 'Enter username in the field',
    ];
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
}

export function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    const isLengthValid = password.length >= 6;
    return passwordRegex.test(password) && isLengthValid;
}

export function isNoDigitInName(name) {
    const nameRegex = /\d/;
    return !nameRegex.test(name);
}
//
// export function isFormValid(signupData) {
//     const isValid =
//         signupData.firstname &&
//         signupData.lastname &&
//         signupData.middlename &&
//         signupData.userName &&
//         signupData.country &&
//         signupData.email &&
//         signupData.password &&
//         isNoDigitInName(signupData.firstname) &&
//         isNoDigitInName(signupData.middlename) &&
//         isNoDigitInName(signupData.lastname) &&
//         isValidEmail(signupData.email) &&
//         isValidPassword(signupData.password);
//     console.log(isValid, signupData)
//     return isValid;
// }

export function isFormValid(formData, formType) {
    switch (formType) {
        case 'registration' : {
            const isValid =
                formData.firstname &&
                formData.lastname &&
                formData.middlename &&
                formData.userName &&
                formData.country &&
                formData.email &&
                formData.password &&
                isNoDigitInName(formData.firstname) &&
                isNoDigitInName(formData.middlename) &&
                isNoDigitInName(formData.lastname) &&
                isValidEmail(formData.email) &&
                isValidPassword(formData.password);
            return isValid;
        }
        case 'login' : {
            const isValid = formData.email && isValidEmail(formData.email) && isValidPassword(formData.password);
            return isValid;
        }
    }
}

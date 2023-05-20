export function validateEmail() {
    return [
        (value) => !!value || 'Email обязателен',
        (value) => isValidEmail(value) || 'Некорректный адрес электронной почты',
    ];
}

export function validatePassword() {
    return [
        (value) => !!value || 'Пароль обязателен',
        (value) => (value && value.length > 5) || 'Пароль должен содержать не менее 6 символов',
        (value) => isValidPassword(value) || 'Пароль должен содержать буквы и цифры',
    ];
}

export function validateCountry(countries) {
    return [
        (value) => !!value || 'Страна обязательна',
        (value) => countries.includes(value) || 'Некорректная страна. Пожалуйста, выберите страну из списка',
    ];
}

export function validateName() {
    return [
        (value) => !!value || 'Введите данные в поле',
        (value) => (value && value.length > 1) || 'Введите корректные данные',
        (value) => isNoDigitInName(value) || 'Цифры не допускаются',
    ];
}

export function validateUsername() {
    return [
        (value) => !!value || 'Введите имя пользователя в поле',
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

export function isFormValid(signupData) {
    const isValid =
        signupData.firstname &&
        signupData.lastname &&
        signupData.middlename &&
        signupData.userName &&
        signupData.country &&
        signupData.email &&
        signupData.password &&
        isNoDigitInName(signupData.firstname) &&
        isNoDigitInName(signupData.middlename) &&
        isNoDigitInName(signupData.lastname) &&
        isValidEmail(signupData.email) &&
        isValidPassword(signupData.password);
    return isValid;
}

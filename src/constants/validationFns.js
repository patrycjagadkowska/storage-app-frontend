import { emailRegex, passwordRegex } from "./regex";

export const validateEmail = (value) => {
    const isValidEmail = emailRegex.test(value);

    if (!isValidEmail) {
        return "Please enter a valid email.";
    }
    return null;
};

export const validatePassword = (value) => {
    const isValidPassword = passwordRegex.test(value);

    if (!isValidPassword) {
        return "Please enter a valid password (5-20 characters, at least one letter and one digit).";
    }
    return null;
};

export const validateRepeatedPassword = (value, firstPassword) => {
    const passHasError = validatePassword(value);

    if (passHasError) {
        return passHasError;
    } else if (passHasError === null && value !== firstPassword) {
        console.log(firstPassword);
        return "Passwords are not equal";
    } else {
        return null;
    }
}
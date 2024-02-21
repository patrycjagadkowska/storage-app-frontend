import {
  emailRegex,
  passwordRegex,
  fullNameRegex,
  contactNameRegex,
  phoneRegex,
  addressRegex,
} from "./regex";

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
    return "Passwords are not equal";
  } else {
    return null;
  }
};

export const validateName = (value) => {
  const isValidName = fullNameRegex.test(value);

  if (!isValidName) {
    return "Please enter a valid name (no numbers or special characters).";
  } else {
    return null;
  }
};

export const validateContactName = (value) => {
  const isValidName = contactNameRegex.test(value);

  if (!isValidName) {
    return "Please enter a valid contact name (min length 1 charcters, max 30).";
  } else {
    return null;
  }
};

export const validatePhone = (value) => {
  if (!value || value === "" || value.trim() === "") {
    return null;
  }

  const isValidPhone = phoneRegex.test(value);

  if (!isValidPhone) {
    return "Valid phone number: optionally starts with '+' or 00 followed by area code, then 9 digits (can be separeted with hyphen or space).";
  } else {
    return null;
  }
};

export const validateAddress = (value) => {
    if (!value || value === "" || value.trim() === "") {
        return null;
    }

    const isValidAddress = addressRegex.test(value);

    if (!isValidAddress) {
        return "Please add a valid address between 5 and 100 characters.";
    } else {
        return null;
    }
};

export const validateOptionalEmail = (value) => {
    if (!value || value === "" || value.trim() === "") {
        return null;
    }

    return validateEmail(value);
};

export const validateDate = (value) => {
    const inputDate = new Date(value);
    const todayDate = new Date();

    if (todayDate - inputDate < 0) {
        return "Please enter a valid date (not later than today).";
    } else {
      return null;
    }
};

export const validateSelect = (value, options) => {
  const isOneOfOptions = options.find((option) => option === value);

    if (!value || value === "" || value.trim() === "" || !isOneOfOptions) {
      return "Please choose one of the options.";
    } else {
      return null;
    }
};

export const validateQuantity = (value) => {
  if (parseInt(value) <= 0) {
    return "Please enter a quantity (number higher than 0).";
  } else {
    return null;
  }
};

export const validatePrice = (value) => {
  if (parseFloat(value) <= 0) {
    return "Please enter a valid price (higher than 0).";
  } else {
    return null;
  }
};

export const validateInventoryQuantity = (value) => {
  if (parseInt(value) < 0) {
    return "Please enter a valid quantity (at least 0).";
  } else {
    return null;
  }
};
export const emailRegex = /^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{5,20}$/;

export const fullNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)?(?:-[A-Za-z]+)?(?: [A-Za-z]+)?(?:-[A-Za-z]+)?(?: [A-Za-z]+)?$/;

export const contactNameRegex = /^.{1,30}$/;

export const phoneRegex = /^\+?[0-9](?:[-\s]?[0-9]){8,17}$/;

export const addressRegex = /^.{5,100}$/;
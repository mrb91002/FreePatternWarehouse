'use strict';

const Joi = require('joi');

// The string must contain at least 1 lowercase alphabetical character
// The string must contain at least 1 uppercase alphabetical character
// The string must contain at least 1 numeric character
// The string must contain at least one special character: ! @ # $ % ^ & *
// The string must be eight characters or longer
const pw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// req.body: firstName, lastName, phone, email, [userName], [password], addressLine1, [addressLine2], addressCity, addressState, addressZip, addressCountry, shipFirstName, shipLastName, shipAddressLine1, [shipAddressLine2], shipAddressCity, shipAddressState, shipAddressZip, shipAddressCountry
module.exports.post = {
  options : {
    allowUnknownBody: false,
  },

  body: {
    firstName: Joi.string()
      .label('First Name')
      .max(255)
      .trim()
      .required(),
    lastName: Joi.string()
      .label('Last Name')
      .max(255)
      .trim()
      .required(),
    phone: Joi.string()
      .label('Phone')
      .min(7)
      .max(20)
      .trim()
      .optional(),
    email: Joi.string()
      .label('Email')
      .email()
      .min(6)
      .max(255)
      .trim()
      .required(),
    userName: Joi.string()
      .label('User Name')
      .min(6)
      .max(255)
      .trim()
      .optional(),
    password: Joi.string()
      .label('Password')
      // .regex(pw, 'Strong Password')
      .min(8)
      .max(255)
      .trim()
      .optional()
  }
};

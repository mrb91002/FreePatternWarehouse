'use strict';

const Joi = require('joi');

module.exports.post = {
  options: {
    allowUnknownBody: false
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
      // .regex(pw, 'Strong Password') - make better regex for this
      .min(8)
      .max(255)
      .trim()
      .optional()
  }
};

module.exports.patch = {
  options: {
    allowUnknownBody: false
  },

  body: {
    aboutMe: Joi.string()
      .label('aboutMe')
      .trim()
      .optional()
  }
};

'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    userName: Joi.string()
      .label('User Name')
      .trim()
      .required(),
    password: Joi.string()
      .label('Password')
      .trim()
      .required()
  }
};

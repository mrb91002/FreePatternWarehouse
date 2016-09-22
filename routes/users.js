'use strict';

const returnColumns = [
  'first_name',
  'last_name',
  'phone',
  'email',
  'user_name',
  'user_image_url',
  'about_me'
];
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const bcrypt = require('bcrypt-as-promised');
const ev = require('express-validation');
const val = require('../validations/users');
const { checkAuth } = require('../modules/middleware');

router.get('/users/:name', (req, res, next) => {
  const profileName = req.params.name;

  knex('users')
    .where('user_name', profileName)
    .first()
    .then((user) => {
      res.send(camelizeKeys(user));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', ev(val.post), (req, res, next) => {
  const user = req.body;

  knex('users')
    .where('user_name', user.userName)
    .orWhere('email', user.email)
    .first()
    .then((exists) => {
      if (exists) {
        if (user.userName === exists.userName) {
          throw boom.conflict('User name already exists');
        }

        if (user.email === exists.email) {
          throw boom.conflict('User email already exists');
        }
      }

      return bcrypt.hash(user.password, 12);
    })
    .then((hashedPassword) => {
      delete user.password;
      user.hashedPassword = hashedPassword;

      return knex('users')
        .returning(['id', 'user_name'])
        .insert(decamelizeKeys(user));
    })
    .then((newUsers) => {
      res.send(camelizeKeys(newUsers[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/users', checkAuth, ev(val.patch), (req, res, next) => {
  const id = req.token.userId;
  const { aboutMe } = req.body;

  if (!Object.keys(req.body).length) {
    throw boom.notAcceptable('Must have data to update');
  }

  knex('users')
    .where('id', id)
    .first()
    .then((exists) => {
      if (!exists) {
        throw boom.notAuthorized('Invalid user Id');
      }

      return knex('users')
        .where('id', id)
        .returning(returnColumns)
        .update(decamelizeKeys({ aboutMe }));
    })
    .then((users) => {
      res.send(camelizeKeys(users[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

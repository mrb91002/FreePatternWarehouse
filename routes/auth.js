'use strict';

const { camelizeKeys } = require('humps');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const ev = require('express-validation');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router(); // eslint-disable-line new-cap
const val = require('../validations/auth');

// User login
router.post('/auth', ev(val.post), (req, res, next) => {
  const { userName, password } = req.body;
  const tokenTimeOut = 1000 * 60 * 60 * 3; // 3 hours in milliseconds
  let user;

  knex('users')
    .where('user_name', userName)
    .first()
    .then((row) => {
      user = camelizeKeys(row);

      if (!user || user.deletedAt) {
        throw boom.unauthorized();
      }

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      const expiry = new Date(Date.now() + tokenTimeOut);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '3h'
      });

      res.cookie('accessToken', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.cookie('loggedIn', {
        userId: user.id,
        userName: user.userName
      }, {
        expires: expiry,
        secure: router.get('env') === 'production'
      });

      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.unauthorized();
    })
    .catch((err) => {
      next(err);
    });
});

// User logout
router.delete('/auth', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('loggedIn');
  res.sendStatus(200);
});

module.exports = router;

'use strict';

const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth } = require('../modules/middleware');

const router = express.Router(); //eslint-disable-line
const knex = require('../knex');

// const boom = require('boom');
// const ev = require('express-validation');
// const val = require('../validations/products');

// 'patterns.id', 'patterns.created_at', 'patterns.pattern_name'

router.get('/favorites/:id', (req, res, next) => {
  const id = req.params.id;

  knex('user_favorites')
    .select('pattern_images.alt_text', 'pattern_images.image_url', 'patterns.id', 'patterns.pattern_name', 'patterns.created_at')
    .where('user_favorites.user_id', id)
    // DB pattern insert orders shouldn't start at 0 - check later
    .innerJoin('pattern_images', 'user_favorites.pattern_id', 'pattern_images.pattern_id')
      .innerJoin('patterns', 'user_favorites.pattern_id', 'patterns.id')
    .andWhere('pattern_images.display_order', 1)
    .then((patterns) => {
      res.send(camelizeKeys(patterns));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

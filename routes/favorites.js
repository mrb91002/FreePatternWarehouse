'use strict';

const express = require('express');
const boom = require('boom');
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

router.post('/favorites', checkAuth, (req, res, next) => {
  const { patternId } = req.body;
  const userId = req.token.userId;
  const insertFavorite = { userId, patternId };
  let patternImage;

  knex('user_favorites')
    .select('patterns.id')
    .where('user_favorites.user_id', userId)
      .innerJoin('patterns', 'user_favorites.pattern_id', 'patterns.id')
    .then((patterns) => {
      const alreadyFavorite = patterns.filter((pattern) => {
        if (pattern.id === parseInt(patternId)) {
          return pattern;
        }

        return;
      });

      if (alreadyFavorite.length) {
        throw boom.conflict('already a favorite');
      }

      return knex('pattern_images')
        .select('image_url', 'alt_text')
        .first()
        .where('pattern_id', patternId)
        .andWhere('display_order', '1');
    })
    .then((image) => {
      patternImage = camelizeKeys(image);

      return knex('user_favorites')
        .insert(decamelizeKeys(insertFavorite), '*');
    })
    .then((favorites) => {
      const newfavorite =
        Object.assign(camelizeKeys(favorites[0]), patternImage);

      res.send(camelizeKeys(newfavorite));
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;

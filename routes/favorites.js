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
    .select('pattern_images.alt_text', 'pattern_images.image_url',
      'patterns.id', 'patterns.pattern_name', 'patterns.created_at')
    .where('user_favorites.user_id', id)

    // DB pattern insert orders shouldn't start at 0 - check later
    .innerJoin('pattern_images', 'user_favorites.pattern_id',
      'pattern_images.pattern_id')
      .innerJoin('patterns', 'user_favorites.pattern_id', 'patterns.id')
    .andWhere('pattern_images.display_order', 1)
    .then((patterns) => {
      const moddedPatterns = patterns.map((pattern) => {
        pattern.display = 'none';
        pattern.clicked = 'false';

        return pattern;
      });

      res.send(camelizeKeys(moddedPatterns));
    })
    .catch((err) => {
      next(err);
    });
});

// Route that checks a pattern against user favorites and adds if not a favorite
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
          return true;
        }

        return false;
      });

      if (alreadyFavorite.length) {
        throw boom.conflict('already a favorite');
      }

      return knex('pattern_images')
        .select('image_url', 'alt_text', 'pattern_name')
        .first()
        .where('pattern_id', patternId)
        .andWhere('display_order', '1')
        .innerJoin('patterns', 'pattern_images.pattern_id', 'patterns.id');
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

router.delete('/favorites/:id', checkAuth, (req, res, next) => {
  const patternId = req.params.id;
  const userId = req.token.userId;

  knex('user_favorites')
    .del()
    .where('user_id', userId)
    .andWhere('pattern_id', patternId)
    .then((deleted) => {
      if (deleted === 1) {
        res.send(req.params.id);
      }
      else {
        res.send('Favorite already deleted');
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

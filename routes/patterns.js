'use strict';

const express = require('express');

const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
// const val = require('../validations/products');

router.get('/patterns', (_req, res, next) => {
  let resultPatterns;

  knex('patterns')
    .select( 'patterns.pattern_name', 'patterns.user_id', 'users.first_name', 'users.last_name', 'users.user_name', 'users.user_image_url', 'users.email', 'patterns.id','patterns.pattern_name')
    .orderBy('patterns.created_at', 'ASC')
    .innerJoin('users', 'users.id', 'patterns.user_id')
    .then((patterns) => {
      resultPatterns = camelizeKeys(patterns);

      return Promise.all(resultPatterns.map((pattern) => {

        return knex('pattern_images')
          .select('pattern_images.alt_text', 'pattern_images.display_order', 'pattern_images.image_url')
          .where('pattern_images.pattern_id', pattern.id)
          .orderBy('display_order')
          .then((imgs) => {
            pattern.images = camelizeKeys(imgs);
          })
      }));
    })
    .then(() => {
      res.send(camelizeKeys(resultPatterns));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/patterns/:id', (req, res, next) => {
  const id = req.params.id;

  knex('patterns')
    .where('patterns.id', id)
    .orderBy('patterns.created_at', 'ASC')
    // .where('pattern_images.display_order', '1' )
    .innerJoin('pattern_images','patterns.id', 'pattern_images.pattern_id')
    .then((patterns) => {
      // resultPatterns = camelizeKeys(patterns);
      res.send(camelizeKeys(patterns));

      // return Promise.all(resultProducts.map((prod) => {
      //   delete prod.createdAt;
      //   delete prod.updatedAt;
      //   delete prod.deleted;
      //
      //   return knex('product_images')
      //     .select('alt_text', 'display_order', 'image_url')
      //     .where('product_id', prod.id)
      //     .orderBy('display_order')
      //     .then((imgs) => {
      //       prod.images = camelizeKeys(imgs);
      //     });
      // }));
    // })
    // .then(() => {
    //   res.send(resultProducts);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

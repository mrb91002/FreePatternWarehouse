'use strict';

const express = require('express');

const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
// const val = require('../validations/products');

router.get('/patterns', (_req, res, next) => {

  knex('patterns')
    .select('pattern_images.alt_text', 'pattern_images.display_order', 'patterns.pattern_name', 'patterns.user_id', 'pattern_images.image_url', 'users.first_name', 'users.last_name', 'users.user_name', 'users.email', 'patterns.id')
    // .where('patterns.id', 1)
    .orderBy('patterns.created_at', 'ASC')
    .innerJoin('pattern_images','patterns.id', 'pattern_images.pattern_id')
    .innerJoin('users', 'users.id', 'patterns.user_id')
    .then((patterns) => {
      res.send(camelizeKeys(patterns));
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

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
    // .orderBy('name')
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

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

router.get('/patterns2', (_req, res, next) => {

      knex.raw('SELECT p.created_at, p.user_id, p.pattern_name, materials, users.email, users.user_name, users.user_image_url, images, steps, p.id FROM patterns p JOIN (SELECT pattern_materials.pattern_id, array_agg(pattern_materials.material ORDER BY pattern_materials.display_order ASC) AS materials FROM pattern_materials GROUP BY pattern_materials.pattern_id) pattern_materials ON pattern_materials.pattern_id = P.id JOIN (SELECT pattern_images.pattern_id, array_agg(array[pattern_images.image_url, pattern_images.alt_text] ORDER BY pattern_images.display_order) AS images FROM pattern_images GROUP BY pattern_images.pattern_id) pattern_images ON pattern_images.pattern_id = P.id JOIN ( SELECT pattern_steps.pattern_id, array_agg(pattern_steps.step_details ORDER BY pattern_steps.display_order ASC) AS steps FROM pattern_steps GROUP BY pattern_steps.pattern_id) pattern_steps ON pattern_steps.pattern_id = P.id JOIN (SELECT * FROM USERS) users ON users.id = P.id;')
    .then((data) => {
      res.send(camelizeKeys(data));
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
    })
    .catch((err) => {
      next(err);
    });
});

// router.post('/patterns', (req, res next) => {
//   knex.transaction(function(trx) => {
//     {pattern, steps, images, materials} = req.body;
//
// // pattern - user_id, pattern_name
// // steps   - pattern_id, step_details, display_order
// // images - pattern_id, image_url, alt_text, display_order
// // materials - pattern_id, display_order, material
//
//     return trx
//       .insert({pattern}, id)
//       .into('patterns')
//       .transacting(trx)
//       .then((ids) => {
//         return knex.insert(info).into('pattern').transacting(trx);
//    });
//  })
//
//
//
//
//
//
//   })
//   .then((pattern) => {
//     console.log('pattern saved');
//   })
//   .catch((err) => {
//     console.log('error inserting pattern');
//   });
//
// });

module.exports = router;

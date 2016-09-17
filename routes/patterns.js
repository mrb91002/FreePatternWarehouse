'use strict';

const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth } = require('../modules/middleware');

const router = express.Router(); //eslint-disable-line
const knex = require('../knex');

const boom = require('boom');
const ev = require('express-validation');
// const val = require('../validations/products');

router.get('/patterns', (_req, res, next) => {
  let resultPatterns;

  knex('patterns')
    .select('patterns.pattern_name', 'patterns.user_id', 'users.first_name',
      'users.last_name', 'users.user_name', 'users.user_image_url',
      'users.email', 'patterns.id', 'patterns.pattern_name')
    .orderBy('patterns.created_at', 'ASC')
    .innerJoin('users', 'users.id', 'patterns.user_id')
    .then((patterns) => {
      resultPatterns = camelizeKeys(patterns);

      return Promise.all(resultPatterns.map((pattern) => {
        return knex('pattern_images')
          .select('pattern_images.alt_text', 'pattern_images.display_order',
            'pattern_images.image_url')
          .where('pattern_images.pattern_id', pattern.id)
          .orderBy('display_order')
          .then((imgs) => {
            pattern.images = camelizeKeys(imgs);
          });
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
// eslint-disable-next-line max-len
  knex.raw('SELECT p.created_at, p.user_id, p.pattern_name, materials, users.email, users.user_name, users.user_image_url, images, steps, p.id FROM patterns p JOIN (SELECT pattern_materials.pattern_id, array_agg(pattern_materials.material ORDER BY pattern_materials.display_order ASC) AS materials FROM pattern_materials GROUP BY pattern_materials.pattern_id) pattern_materials ON pattern_materials.pattern_id = P.id JOIN (SELECT pattern_images.pattern_id, array_agg(array[pattern_images.image_url, pattern_images.alt_text] ORDER BY pattern_images.display_order) AS images FROM pattern_images GROUP BY pattern_images.pattern_id) pattern_images ON pattern_images.pattern_id = P.id JOIN ( SELECT pattern_steps.pattern_id, array_agg(pattern_steps.detail ORDER BY pattern_steps.display_order ASC) AS steps FROM pattern_steps GROUP BY pattern_steps.pattern_id) pattern_steps ON pattern_steps.pattern_id = P.id JOIN (SELECT * FROM USERS) users ON users.id = P.id;')
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

    .innerJoin('pattern_images', 'patterns.id', 'pattern_images.pattern_id')
    .then((patterns) => {
      // resultPatterns = camelizeKeys(patterns);

      res.send(camelizeKeys(patterns));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/patterns', checkAuth, (req, res, next) => {
  const { patternName, steps, images, materials } = req.body;
  const userId = req.token.userId;
  const insertPattern = { userId, patternName };
  let newPattern;

  knex.transaction((trx) => {
    knex('patterns')
      .insert(decamelizeKeys(insertPattern), '*')
      .transacting(trx)
      .then((pattern) => {
        newPattern = camelizeKeys(pattern);

        const newImages = images.map((image) => {
          image.patternId = pattern.id;

          return image;
        });

        return knex('images')
          .insert(decamelizeKeys(newImages), '*')
          .transacting(trx);
      })
      .then((returnedImages) => {
        newPattern.images = returnedImages;

        const newSteps = steps.map((step, index) => {
          return {
            displayOrder: index,
            detail: step,
            patternId: newPattern.id
          };
        });

        return knex('pattern_steps')
          .insert(decamelizeKeys(newSteps), '*')
          .transacting(trx);
      })
      .then((returnedSteps) => {
        newPattern.steps = returnedSteps;

        const newMaterials = materials.map((material, index) => {
          return {
            displayOrder: index,
            material,
            patternId: newPattern.id
          };
        });

        return knex('pattern_materials')
          .insert(decamelizeKeys(newMaterials), '*')
          .transacting(trx);
      })
      .then((returnedMaterials) => {
        newPattern.materials = returnedMaterials;

        return;
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then(() => {
    res.send(newPattern);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;

// pattern - user_id, pattern_name {userId: userId, patternName: 'something'}
// steps   - pattern_id, step_details, display_order
// images - pattern_id, image_url, alt_text, display_order
// materials - pattern_id, display_order, material

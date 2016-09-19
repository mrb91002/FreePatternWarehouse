/* eslint-disable camelcase */
/* eslint-disable max-len */

'use strict';

exports.seed = function(knex) {
  return knex('pattern_steps').del()
    .then(() => {
      return knex('pattern_steps').insert([{
        id: 1,
        pattern_id: 1,
        display_order: 1,
        detail: 'This is a step that you need to follow in order to build out the product that you see above. See figure:1 There could be a ton of steps or there could be just a few.  This comment is going to be a little long. FIGURE: 4  In this step you could potentially refer to one of the images on the side. figure:2 This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        pattern_id: 1,
        display_order: 2,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few. figure:3 This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        pattern_id: 1,
        display_order: 3,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        pattern_id: 1,
        display_order: 4,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        pattern_id: 1,
        display_order: 5,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 6,
        pattern_id: 1,
        display_order: 6,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 7,
        pattern_id: 3,
        display_order: 1,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 8,
        pattern_id: 2,
        display_order: 1,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 9,
        pattern_id: 4,
        display_order: 1,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 10,
        pattern_id: 1,
        display_order: 8,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 11,
        pattern_id: 5,
        display_order: 1,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 12,
        pattern_id: 5,
        display_order: 2,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 13,
        pattern_id: 5,
        display_order: 3,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 14,
        pattern_id: 1,
        display_order: 7,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 15,
        pattern_id: 2,
        display_order: 2,
        detail: 'This is a step that you need to follow in order to build out the product that you see above.  There could be a ton of steps or there could be just a few.  This comment is going to be a little long.  In this step you could potentially refer to one of the images on the side.  This will allow the crafter to make references to images and make the creation of a pattern easier.  There are a few different layout ideas for this, but this is the one that seems to easiest for users at the moment.',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 16,
        pattern_id: 6,
        display_order: 2,
        detail: 'this should be step 2!',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 17,
        pattern_id: 6,
        display_order: 1,
        detail: 'this should be step 1',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('pattern_steps_id_seq', (SELECT MAX(id) FROM pattern_steps));"
      );
    });
};

const knex = require('./knex');
const express = require('express');

// const sql = knex('patterns')
//   .toString();

// knex.raw(`SELECT p.created_at, p.user_id, p.pattern_name, materials, images, steps, p.id FROM patterns p JOIN (SELECT pattern_materials.pattern_id, array_agg(pattern_materials.material ORDER BY pattern_materials.display_order ASC) AS materials FROM pattern_materials GROUP BY pattern_materials.pattern_id) pattern_materials ON pattern_materials.pattern_id = P.id JOIN (SELECT pattern_images.pattern_id, array_agg(pattern_images.image_url ORDER BY pattern_images.display_order ASC) AS images FROM pattern_images GROUP BY pattern_images.pattern_id) pattern_images ON pattern_images.pattern_id = P.id JOIN ( SELECT pattern_steps.pattern_id, array_agg(pattern_steps.step_details ORDER BY pattern_steps.display_order ASC) AS steps FROM pattern_steps GROUP BY pattern_steps.pattern_id) pattern_steps ON pattern_steps.pattern_id = P.id;`
// ).then((results) => {
//   console.log(results);
// }).catch((err) => {
//   console.log(err);
// })

knex('patterns').then((results) => {
  console.log(results);
});



// console.log(sql);

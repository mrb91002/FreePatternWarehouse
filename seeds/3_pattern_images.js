
exports.seed = function(knex) {
  return knex('pattern_images').del()
    .then(() => {
      return knex('pattern_images').insert([{
        id:1,
        pattern_id:1,
        display_order:1,
        image_url: 'http://tutorials.knitpicks.com/wptutorials/wp-content/uploads/2009/12/circular4.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:2,
        pattern_id:1,
        display_order:2,
        image_url: 'http://www.threadsmagazine.com/assets/uploads/posts/5152/SST1-knits-wovens-02.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:3,
        pattern_id:1,
        display_order:3,
        image_url: 'http://tutorials.knitpicks.com/wptutorials/wp-content/uploads/2009/12/circular4.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:4,
        pattern_id:1,
        display_order:4,
        image_url: 'https://www.eusa.ed.ac.uk/pageassets/societies/society/knitsoc/yarn-pictures.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:5,
        pattern_id:1,
        display_order:5,
        image_url: 'http://1.bp.blogspot.com/-DWBvVtXR7hk/TjQOuYcU1uI/AAAAAAAAE5A/C2Mjol9ID88/s1600/Knitted+Apple+Fruit.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:6,
        pattern_id:1,
        display_order:6,
        image_url: 'http://tipsted.com/wp-content/uploads/2015/01/kniting-tips.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id:7,
        pattern_id:3,
        display_order:1,
        image_url: 'http://www.thegreenhead.com/imgs/xl/knit-turkey-hat-xl.jpg',
        alt_text: 'turkey hat',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:8,
        pattern_id:2,
        display_order:1,
        image_url: 'https://img1.etsystatic.com/019/1/6992584/il_340x270.473736629_c0ti.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:9,
        pattern_id:4,
        display_order:1,
        image_url: 'https://i.ytimg.com/vi/_yH5JRVTSOc/maxresdefault.jpg',
        alt_text: 'knit cable beanie',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:10,
        pattern_id:1,
        display_order:7,
        image_url: 'http://tutorials.knitpicks.com/wptutorials/wp-content/uploads/2009/12/circular4.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:11,
        pattern_id:5,
        display_order:1,
        image_url: 'http://www.craftsy.com/blog/wp-content/uploads/2013/07/KnitClutch.jpg',
        alt_text: 'knit clutch',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:12,
        pattern_id:5,
        display_order:2,
        image_url: 'http://knittsings.com/wp-content/uploads/2012/01/circular-dish-rag-machine-knit.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:13,
        pattern_id:5,
        display_order:3,
        image_url: 'https://nikkidwright.files.wordpress.com/2008/11/dsc01848.jpg',
        alt_text: 'green',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:14,
        pattern_id:1,
        display_order:8,
        image_url: 'https://s-media-cache-ak0.pinimg.com/236x/f2/b9/1e/f2b91e0c58fd328cfc8f02113c48cf52.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:15,
        pattern_id:2,
        display_order:2,
        image_url: 'http://3.bp.blogspot.com/-mgfTaNUKjqM/USfZWcTwgXI/AAAAAAAADfo/eiXa3WqFo7k/s1600/DSC_0007.JPG',
        alt_text: 'knit hat with ears',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },{
        id:16,
        pattern_id:6,
        display_order:1,
        image_url: 'http://tutorials.knitpicks.com/wptutorials/wp-content/uploads/2009/12/circular4.jpg',
        alt_text: 'hands kniting something pink',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      },]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('pattern_images_id_seq', (SELECT MAX(id) FROM pattern_images));"
      );
    });
};

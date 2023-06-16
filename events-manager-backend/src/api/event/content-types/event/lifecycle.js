// const slugify = require('slugify');
const strapi = require('@strapi/strapi');

console.log("strapi: ", strapi);

// module.exports = {
//   async beforeCreate(event) {

//   // Generate slug using the 'plugin::content-manager.uid' service

//   const slug = await strapi.service('plugin::content-manager.uid').generateUIDField({
//   contentTypeUID: 'api::product.product'// Replace 'product' with your collection name,
//   field: 'slug', // Replace 'slug' with the desired field name
//   data: event.params.data
// }); 



// // Assign the generated slug to the 'slug' field
// event.params.data.slug = slug;

// // Assign the generated slug to the 'slug2' field (if needed)
// event.params.data.slug2 = slug;
// }
// };
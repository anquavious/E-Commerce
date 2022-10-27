// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'Category',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'Product',
});

// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag, {
//   foreignKey: 'Tag',
// });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: 'tag_product',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

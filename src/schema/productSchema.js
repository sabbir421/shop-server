// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
});

const Variant = sequelize.define("Variant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  variantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Variant,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations with explicit aliases
Product.hasMany(Variant, { as: "variants", foreignKey: "productId" });
Variant.belongsTo(Product, { as: "product", foreignKey: "productId" });

Variant.hasMany(Image, { as: "images", foreignKey: "variantId" });
Image.belongsTo(Variant, { as: "variant", foreignKey: "variantId" });

module.exports = { Product, Variant, Image };

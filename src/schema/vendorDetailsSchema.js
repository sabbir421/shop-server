const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const vendorDetails = sequelize.define(
  "vendor_details",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idProofUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleAddressLat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    googleAddressLng: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    addressLineOne: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLineTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fkCountry: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fkCity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: "vendor_details",
  }
);

module.exports = vendorDetails;

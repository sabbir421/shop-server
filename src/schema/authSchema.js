const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "CUSTOMER",
    },
    countryCode: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    firebaseToken: {
      type: DataTypes.STRING,
      defaultValue: null,
      field: "firebase_token",
    },
    loginId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "login_id",
    },
    regType: {
      type: DataTypes.STRING,
      defaultValue: null,
      field: "login_type",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "ACTIVE",
    },
    mobile: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    appleIdentity: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "Users",
  }
);

module.exports = Users;

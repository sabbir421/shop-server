const { Sequelize } = require("sequelize");
const { variables } = require("./variables");

const sequelize = new Sequelize({
  dialect: "mysql",
  username: variables.dbConfig.dbUserName,
  password: variables.dbConfig.dbPass,
  database: variables.dbConfig.dbDatabase,
  host: variables.dbConfig.dbHost,
  port: 3306,
  logging: false,
});
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
module.exports = sequelize;

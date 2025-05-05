require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db", "admin", "admin_password", {
    host: "127.0.0.1",
    port: 1234,
    dialect: "postgres",
    logging: false,
});

module.exports = sequelize;

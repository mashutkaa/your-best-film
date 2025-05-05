const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BestFilm = sequelize.define("best_film", {
    best_film_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    poster_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = BestFilm;

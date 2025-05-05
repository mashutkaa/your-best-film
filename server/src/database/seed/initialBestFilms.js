require("dotenv").config();
const sequelize = require("../../config/database");
const BestFilm = require("../../models/BestFilm");

const fetchBestFilms = require("../../services/external/tmdb/bestFilms");

async function initialBestFilms() {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ force: true });

        const bestFilms = await fetchBestFilms();

        const createFilmPromises = bestFilms.map((film) =>
            BestFilm.create({
                title: film.title,
                description: film.description,
                rating: film.rating,
                poster_url: film.poster,
            }),
        );

        await Promise.all(createFilmPromises);

        console.log("🎉 Початкові найкращі фільми додано успішно.");
    } catch (error) {
        console.error("❌ Помилка під час ініціалізації фільмів:", error);
    } finally {
        await sequelize.close(); // закриваємо з’єднання
    }
}

initialBestFilms();

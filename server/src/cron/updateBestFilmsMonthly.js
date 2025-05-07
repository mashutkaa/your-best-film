const cron = require("node-cron");
const fetchBestFilms = require("../services/external/tmdb/bestFilms");
const BestFilm = require("../models/BestFilm");

module.exports = () => {
    cron.schedule("0 0 1 * *", async () => {
        console.log("🕐 Running monthly best films cron job...");
        try {
            const bestFilms = await fetchBestFilms();

            await Promise.all(
                bestFilms.map((film) =>
                    BestFilm.upsert({
                        title: film.title,
                        description: film.description,
                        rating: film.rating,
                        poster_url: film.poster,
                    }),
                ),
            );

            console.log("Best films saved to database.");
        } catch (error) {
            console.error("Failed to fetch or save best films:", error);
        }
    });
};

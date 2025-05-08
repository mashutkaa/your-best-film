const fetchFilmsRecommendation = require("../services/external/openai/createRecommendations");
const filterRecommendation = require("../services/external/tmdb/filterFilms");

const getFilmRecommendations = async (req, res) => {
    try {
        const rawRecommendations = await fetchFilmsRecommendation(req.body);
        const filtered = await filterRecommendation(rawRecommendations);

        if (!filtered || filtered.length === 0) {
            return res.status(404).json({ error: "Фільм не знайдено" });
        }

        res.status(200).json(filtered);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports = { getFilmRecommendations };

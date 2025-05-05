const BestFilm = require("../models/BestFilm");

const getAllBestFilms = async (req, res) => {
    try {
        const bestFilms = await BestFilm.findAll();
        res.json(bestFilms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBestFilmById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res
            .status(400)
            .json({ message: `Invalid best film ID ${id}: must be a number` });
    }

    try {
        const bestFilm = await BestFilm.findByPk(id);

        if (bestFilm) {
            res.json(bestFilm);
        } else {
            res.status(404).json({
                message: `BestFilm with ID ${id} not found`,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBestFilms,
    getBestFilmById,
};

require("dotenv").config();
const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = `https://api.themoviedb.org/3`;
const TMDB_LANGUAGE = "uk-UA";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const searchMovieByTitle = async (title) => {
    try {
        const response = await axios.get(`${TMDB_API_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: title,
                language: TMDB_LANGUAGE,
            },
        });

        const movie = response.data.results?.[0];
        if (!movie) return null;

        return {
            title: movie.title,
            description: movie.overview,
            rating: movie.vote_average,
            poster: movie.poster_path
                ? `${TMDB_IMAGE_URL}${movie.poster_path}`
                : null,
        };
    } catch (error) {
        console.error(`Error searching movie: ${title}`, error.message);
        return null;
    }
};

const filterRecommendation = async (recommendations) => {
    const results = [];

    for (const title of recommendations) {
        const movie = await searchMovieByTitle(title);
        if (movie) {
            results.push(movie);
        }
    }

    return results;
};

module.exports = filterRecommendation;

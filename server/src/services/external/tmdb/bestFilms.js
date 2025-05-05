require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
const TMDB_LANGUAGE = "uk-UA";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchBestFilms() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const firstDay = `${year}-${month}-01`;
    const lastDay = new Date(year, now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

    try {
        const response = await fetch(
            `${TMDB_API_URL}&language=${TMDB_LANGUAGE}&sort_by=vote_average.desc&vote_count.gte=20&primary_release_date.gte=${firstDay}&primary_release_date.lte=${lastDay}&page=1`,
        );

        const data = await response.json();

        if (data.results) {
            const filteredMovies = data.results.filter((movie) => {
                return (
                    movie.vote_average >= 6.5 &&
                    [
                        movie.title,
                        movie.overview,
                        movie.vote_average,
                        movie.poster_path,
                    ].every(
                        (info) =>
                            info !== null && info !== undefined && info !== "",
                    )
                );
            });

            const top7Movies = filteredMovies.slice(0, 7);

            return top7Movies.map((movie) => ({
                title: movie.title,
                description: movie.overview,
                rating: movie.vote_average,
                poster: movie.poster_path
                    ? `${TMDB_IMAGE_URL}${movie.poster_path}`
                    : null,
            }));
        } else {
            throw new Error("No movies found");
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

module.exports = fetchBestFilms;

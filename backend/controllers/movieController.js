import fetchMovieRecommendation from "../chatGPT/movieRecommendations.js";

export async function getMovieRecommendations(req, res) {
    try {
        const recommendations = await fetchMovieRecommendation(req.body);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}

export async function getPopularMovies(req, res) {
  const apiKey = process.env.TMDB_API_KEY;
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=uk&page=1`);
      const data = await response.json();

      if (data.results) {
          const forbiddenWords = [
              "росія",
              "russia",
              "россий",
              "москва",
              "путін",
              "kremlin",
              "російськ",
              "росіянин",
              "росіянка",
              "росіяни",
              "совет",
              "ссср",
              "сталін",
              "ленін",
          ];

          const filteredMovies = data.results.filter((movie) => {
              const overview = movie.overview.trim().toLowerCase();

              const containsForbiddenWords = forbiddenWords.some(
                  (word) => overview.includes(word)
              );

              return (
                  movie.vote_average >= 6.5 &&
                  !containsForbiddenWords &&
                  overview !== ""
              );
          });

          const top7Movies = filteredMovies.slice(0, 7);

          const movies = top7Movies.map((movie) => ({
              title: movie.title,
              description: movie.overview,
              rating: movie.vote_average,
              poster: movie.poster_path
                  ? `${imageBaseUrl}${movie.poster_path}`
                  : null,
          }));

          res.status(200).json(movies);
      } else {
          res.status(404).json({ message: 'No movies found' });
      }
  } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
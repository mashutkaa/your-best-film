const checkResults = () => {
    const recommendations = JSON.parse(localStorage.getItem("recommendations"));
    console.log(recommendations);

    const apiKey = "4d5fbb327da57370030fbb7ccdefaf70";

    async function getCheckedMovies(films) {
        let checkedRecommendations = [];

        const moviePromises = films.map((film) => {
            return getMovieData(film.name).then((movie) => {
                if (movie) {
                    checkedRecommendations.push(movie);
                }
            });
        });

        await Promise.all(moviePromises);

        console.log(checkedRecommendations);
        return checkedRecommendations;
    }

    async function getMovieData(movieTitle) {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            movieTitle
        )}&language=uk-UA`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const movie = data.results[0];

                const movieTitle = movie.title;
                const movieRating = movie.vote_average;
                const movieReleaseYear = movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "Невідомо";
                const movieDescription = movie.overview || "Опис відсутній";
                const genreIds = movie.genre_ids;
                const posterPath = movie.poster_path;

                const posterUrl = posterPath
                    ? `https://image.tmdb.org/t/p/w500${posterPath}`
                    : null;

                const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=uk-UA`;
                const genreResponse = await fetch(genreApiUrl);
                const genreData = await genreResponse.json();

                const genres = genreData.genres
                    .filter((genre) => genreIds.includes(genre.id))
                    .map((genre) => genre.name);

                return {
                    title: movieTitle,
                    rating: movieRating,
                    genres:
                        genres.length > 0
                            ? genres.join(", ")
                            : "Невідомий жанр",
                    releaseYear: movieReleaseYear,
                    description: movieDescription,
                    posterUrl: posterUrl,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log("Помилка запиту:", error);
            return null;
        }
    }

    getCheckedMovies(recommendations).then((checkedRecommendations) => {
        const resultsWrapper = document.querySelector(".results__wrapper");
        checkedRecommendations.forEach((film, index) => {
            const filmWrapper = document.createElement("div");
            filmWrapper.classList.add("result-film__wrapper");

            filmWrapper.innerHTML = `
            <table>
                <colgroup>
                    <col class="col1" />
                    <col class="col2" />
                </colgroup>
                <tr>
                    <td>Назва фільму</td>
                    <td>
                        <div class="film-name__wrapper">
                            <button class="save-film">
                                <img
                                    src="./icons/save-film-button.svg"
                                    alt="save-film-button"
                                />
                            </button>
                            <p class="film-name">"${film.title}"</p>
                            <p><span>${Number(film.rating).toFixed(
                                1
                            )}/10</span></p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Жанр фільму</td>
                    <td>${film.genres}</td>
                </tr>
                <tr>
                    <td>Рік випуску фільму</td>
                    <td>${film.releaseYear} рік</td>
                </tr>
                <tr>
                    <td>Опис фільму</td>
                    <td>
                        ${film.description}
                    </td>
                </tr>
            </table>
            <img
                class="result-film__img"
                src="${film.posterUrl}"
                alt="film img"
            />
            `;

            resultsWrapper.appendChild(filmWrapper);

            if (index < checkedRecommendations.length - 1) {
                const hr = document.createElement("hr");
                resultsWrapper.appendChild(hr);
            }
        });
    });
};

export default checkResults;

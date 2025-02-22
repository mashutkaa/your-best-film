const bestFilms = () => {
    const getBestMovies = () => {
        const apiKey = "4d5fbb327da57370030fbb7ccdefaf70";
        const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=uk&page=1`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
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

                    console.log(movies);
                    handleBestMovies(movies);
                }
            })
            .catch((error) => console.error("Помилка:", error));
    };

    function checkDateOnLoading() {
        const now = new Date();
        if (now.getDate() === 1) {
            getBestMovies();
        }
    }

    function scheduleNextCheck() {
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setHours(24, 0, 0, 0);

        const timeUntilMidnight = nextMidnight - now;

        setTimeout(() => {
            checkDateOnLoading();
            setInterval(checkDateOnLoading, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);
    }

    checkDateOnLoading();

    scheduleNextCheck();

    getBestMovies();

    const handleBestMovies = (movies) => {
        movies.forEach((movie, index) => {
            const { title, description, rating, poster } = movie;

            let descriptionMovie = description;
            if (descriptionMovie.length > 350) {
                descriptionMovie = description.slice(0, 320) + "...";
            }

            let film = document.getElementById(`${index + 1}-best-film`);
            film.style.backgroundImage = `url("${poster}")`;

            let newDescr = document.createElement("div");
            newDescr.classList.add(index <= 2 ? "dropright" : "dropleft");
            newDescr.innerHTML = `
                    <div class="text-content">
                        <h4>${title}</h4>
                        <p class="best-film__descr">${descriptionMovie}</p>
                        <p class="best-film__raiting">${rating.toFixed(
                            1
                        )}/10</p>
                    </div>
            `;

            film.insertAdjacentElement("afterend", newDescr);
        });
    };
};

export default bestFilms;

const bestFilms = () => {
  if (window.location.search.includes("emailConfirmed=true")) {
      window.location.reload();
  }

  const getBestMovies = () => {
      const url = `http://localhost:3000/movies/getPopularMovies`;

      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              if (data) {
                  console.log(data);
                  handleBestMovies(data);
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
const carousel = document.querySelector(".best-films__container");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
leftArrow.addEventListener("click", () => {
  carousel.scrollBy({
    left: -130,
  });
});
rightArrow.addEventListener("click", () => {
  carousel.scrollBy({
    left: 130,
  });
});



export default bestFilms;
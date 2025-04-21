const saveFilm = (film, button) => {
    const token = localStorage.getItem("token");

    const newFilm = {
        name: film.title,
        rating: film.rating,
        genre: film.genres,
        year: film.releaseYear,
        description: film.description,
        img_url: film.posterUrl,
    };

    fetch("http://localhost:3000/films", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFilm),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                console.log("Фільм збережено з ID:", data.id);
                button.dataset.filmId = data.id;
                button.classList.add("saved");
                button.querySelector("img").src =
                    "./icons/saved-film-button.png";
            } else {
                console.error("Помилка збереження фільму");
            }
        })
        .catch((error) => console.error("Помилка:", error));
};

export default saveFilm;

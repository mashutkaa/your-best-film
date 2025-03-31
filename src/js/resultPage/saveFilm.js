export const saveFilm = (film, button) => {
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
        },
        body: JSON.stringify(newFilm),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                console.log("Фільм збережено з ID:", data.id);
                button.dataset.filmId = data.id; // Додаємо ID як data-атрибут
                button.classList.add("saved");
            } else {
                console.error("Помилка збереження фільму");
            }
        })
        .catch((error) => console.error("Помилка:", error));
};

export const deleteFilm = (button) => {
    const filmId = button.dataset.filmId;
    console.log(filmId);

    if (!filmId) {
        console.error("Не вдалося отримати ID фільму.");
        return;
    }

    fetch(`http://localhost:3000/films/${filmId}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            button.classList.remove("saved");
            button.querySelector("img").src =
                "../../icons/save-film-button.svg"; // Повертаємо іконку назад
            delete button.dataset.filmId; // Видаляємо атрибут з ID
        })
        .catch((error) => console.error("Помилка видалення:", error));
};

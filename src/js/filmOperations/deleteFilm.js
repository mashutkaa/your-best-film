const deleteFilm = (button) => {
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
        })
        .catch((error) => console.error("Помилка видалення:", error));
};

export default deleteFilm;

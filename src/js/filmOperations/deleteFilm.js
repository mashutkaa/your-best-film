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
            button.classList.remove("saved");
            button.querySelector("img").src = "./icons/save-film-button.svg"; // Повертаємо іконку назад
            delete button.dataset.filmId; // Видаляємо атрибут з ID
        })
        .catch((error) => console.error("Помилка видалення:", error));
};

export default deleteFilm;

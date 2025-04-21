// import saveFilm from "./filmOperations/saveFilm.js";
// import deleteFilm from "./filmOperations/deleteFilm.js";

document.addEventListener("DOMContentLoaded", async () => {
    const collectionId = new URLSearchParams(window.location.search).get("id");
    const token = localStorage.getItem("token");

    if (!token?.trim()) {
        console.log("Користувач не авторизований.");
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:3000/collections/collection-films/${collectionId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Помилка при отриманні фільмів");
        }

        const films = await response.json();
        console.log("Отримані фільми:", films);

        renderFilms(films); // Це приклад функції рендеру
    } catch (error) {
        console.error("Помилка завантаження фільмів:", error);
    }
});

function renderFilms(films) {
    const filmsContainer = document.querySelector(".results__wrapper");

    films.forEach((film, index) => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("result-film__wrapper");

        const isSaved = film.is_saved === 1; // Перевіряємо, чи фільм збережений

        filmElement.innerHTML = `
        <table id="${index}">
            <colgroup>
                <col class="col1" />
                <col class="col2" />
            </colgroup>
            <tr>
                <td>Назва фільму</td>
                <td>
                    <div class="film-name__wrapper">
                        
                        <p class="film-name">"${film.name}"</p>
                        <p><span>${Number(film.rating).toFixed(1)}/10</span></p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Жанр фільму</td>
                <td>${film.genre}</td>
            </tr>
            <tr>
                <td>Рік випуску фільму</td>
                <td>${film.year} рік</td>
            </tr>
            <tr>
                <td>Опис фільму</td>
                <td>${film.description}</td>
            </tr>
        </table>
        <img class="result-film__img" src="${film.img_url}" alt="film img" />
    `;

        filmsContainer.appendChild(filmElement);
    });

    // Додаємо слухачі подій для кнопок "Зберегти"
    document.querySelectorAll(".save-film").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const token = localStorage.getItem("token");

            if (!token?.trim()) {
                alert("Авторизуйтеся, щоб зберегти фільм");
                return;
            }

            const id = button.id.split("-")[0];
            const film = films[id]; // Оскільки films це масив фільмів, отримуємо фільм за індексом
            const isSaved = button.classList.contains("saved");

            if (!isSaved) {
                saveFilm(film, button); // Викликаємо функцію збереження
            } else {
                deleteFilm(button); // Викликаємо функцію видалення
                button.classList.remove("saved"); // Видаляємо клас "saved"
                button.querySelector("img").src =
                    "./icons/save-film-button.svg"; // Відновлюємо стандартну картинку
                delete button.dataset.filmId; // Видаляємо ID фільму з кнопки
            }
        });
    });

    const deleteFilm = (button) => {
        const filmId = button.dataset.filmId;

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
                    button.classList.add("saved"); // Додаємо клас "saved"
                    button.querySelector("img").src =
                        "./icons/saved-film-button.png"; // Змінюємо картинку на збережену
                } else {
                    console.error("Помилка збереження фільму");
                }
            })
            .catch((error) => console.error("Помилка:", error));
    };
}

document.addEventListener("DOMContentLoaded", (event) => {
    // Отримання рекомендацій з localStorage
    const recommendations = JSON.parse(localStorage.getItem("recommendations"));
    // Виклик функція для заповнення сторінки рекомендаціями
    processRecommendations(recommendations);
});

function processRecommendations(recommendations) {
    // Видалення існуючих елементів на сторінці
    document.querySelectorAll(".films-table").forEach((el) => el.remove());
    document.querySelectorAll("hr").forEach((el) => el.remove());

    const mainContainer = document.querySelector(".main-container");

    // Створення елементів для відображення рекомендацій
    let recommendationsTables = [];
    let tempRecommendations = [];

    recommendations.forEach((recommendation, index) => {
        tempRecommendations.push(recommendation);
        if (
            tempRecommendations.length === 2 ||
            index === recommendations.length - 1
        ) {
            recommendationsTables.push(tempRecommendations);
            tempRecommendations = [];
        }
    });

    // const filmTableTemplate = `
    // <div class="films-table">
    //     <ul class="film-params">
    //         <li class="film-param"><p>Назва фільму:</p></li>
    //         <li class="film-param"><p>Жанр:</p></li>
    //         <li class="film-param"><p>Рік випуску:</p></li>
    //         <li class="film-param"><p>Короткий опис фільму:</p></li>
    //     </ul>
    // </div>
    // `;

    // console.log("Сторінка з результатами успішно завантажилася");

    // recommendationsTables.forEach((recommendationsTable, index) => {
    //     const filmsTable = document.createElement("div");
    //     filmsTable.classList.add("films-table");
    //     filmsTable.innerHTML = filmTableTemplate;

    //     recommendationsTable.forEach((recommendation) => {
    //         const film = document.createElement("div");
    //         film.classList.add("film");

    //         const filmTitle = document.createElement("label");
    //         filmTitle.classList.add("custom-checkbox");
    //         filmTitle.innerHTML = `
    //         <input class="film-title" type="checkbox">
    //         <svg class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    //             <path d="M6 0v32l10-10 10 10v-32z"></path>
    //         </svg>
    //         <span class="film-value">
    //             "${recommendation.name}" <span class="film-rating">${recommendation.rating}</span>
    //         </span>
    //         `;

    //         const filmGenre = document.createElement("p");
    //         filmGenre.classList.add("film-value");
    //         filmGenre.textContent = recommendation.genre;

    //         const filmYear = document.createElement("p");
    //         filmYear.classList.add("film-value");
    //         filmYear.textContent = recommendation.year;

    //         const filmReason = document.createElement("p");
    //         filmReason.classList.add("film-value");
    //         filmReason.textContent = recommendation.reason;

    //         film.appendChild(filmTitle);
    //         film.appendChild(filmGenre);
    //         film.appendChild(filmYear);
    //         film.appendChild(filmReason);

    //         filmsTable.appendChild(film);
    //     });

    //     mainContainer.appendChild(filmsTable);

    //     if (index !== recommendationsTables.length - 1) {
    //         const hr = document.createElement("hr");
    //         mainContainer.appendChild(hr);
    //     }
    // });

    const filmTableTemplate = `
        <table class="films-table">
            <tbody>
            </tbody>
        </table>
    `;

    console.log("Сторінка з результатами успішно завантажилася");

    recommendationsTables.forEach((recommendationsTable, index) => {
        let currentTable;
        let rowCount = 0;

        recommendationsTable.forEach((recommendation, filmIndex) => {
            if (rowCount === 0) {
                // Створити нову таблицю
                currentTable = document.createElement("div");
                currentTable.innerHTML = filmTableTemplate;
                currentTable = currentTable.querySelector("table");
                mainContainer.appendChild(currentTable);

                const tbody = currentTable.querySelector("tbody");

                // Додати рядки для характеристик
                [
                    "Назва фільму",
                    "Жанр",
                    "Рік випуску",
                    "Короткий опис фільму",
                ].forEach((characteristic, charIndex) => {
                    const row = document.createElement("tr");
                    const charCell = document.createElement("td");
                    charCell.textContent = characteristic;
                    row.appendChild(charCell);

                    // Додаємо порожні клітинки для двох фільмів
                    row.appendChild(document.createElement("td"));
                    row.appendChild(document.createElement("td"));

                    tbody.appendChild(row);
                });
            }

            // Додати інформацію про фільм у відповідний стовпець
            const tbody = currentTable.querySelector("tbody");
            const rows = tbody.querySelectorAll("tr");

            rows[0].children[rowCount + 1].innerHTML = `
            <label class="custom-checkbox">
                <input class="film-title" type="checkbox">
                <svg class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M6 0v32l10-10 10 10v-32z"></path>
                </svg>
                <span class="film-value">
                    "${recommendation.name}" <span class="film-rating">${recommendation.rating}</span>
                </span>
            </label>
        `;

            rows[1].children[rowCount + 1].textContent = recommendation.genre;
            rows[2].children[rowCount + 1].textContent = recommendation.year;
            rows[3].children[rowCount + 1].textContent = recommendation.reason;

            rowCount++;

            // Якщо таблиця заповнена (2 фільми), створити нову
            if (rowCount === 2) {
                rowCount = 0;

                if (
                    filmIndex !== recommendationsTable.length - 1 ||
                    index !== recommendationsTables.length - 1
                ) {
                    const hr = document.createElement("hr");
                    mainContainer.appendChild(hr);
                }
            }
        });

        // Якщо залишилися фільми, але таблиця не заповнена, додаємо роздільник
        if (rowCount > 0 && index !== recommendationsTables.length - 1) {
            const hr = document.createElement("hr");
            mainContainer.appendChild(hr);
        }
    });
}

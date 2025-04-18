import deleteFilm from "../filmOperations/deleteFilm.js";
import getAllFilms from "../filmOperations/getAllFilms.js";
const renderFilms = (films) => {
    const section = document.querySelector(".saved-films__section");
    section.innerHTML = ""; // очистити все перед вставкою

    for (let i = 0; i < films.length; i += 2) {
        const wrapper = document.createElement("section");
        wrapper.classList.add("saved-films__wrapper");

        const filmGroup = films.slice(i, i + 2);

        filmGroup.forEach((film) => {
            const filmContainer = document.createElement("div");
            filmContainer.classList.add("film__container");

            filmContainer.innerHTML = `
                <div class="film__card">
                    <img class="film-img" src="${film.img_url}" alt="${
                film.name
            }">
                    <div class="film__info">
                        <div class="film__info-header">
                            <h3 class="title">${film.name}</h3>
                            <p class="rating">${film.rating.toFixed(1)}/10</p>
                            <p class="genres">${film.genre}</p>
                            <p class="year">${film.year} рік</p>
                        </div>
                        <button class="delete__button" data-film-id="${
                            film.id
                        }">
                            <img src="./icons/delete-button.svg" alt="Видалити">
                        </button>
                    </div>
                </div>
                <p class="description">${film.description}</p>
            `;

            wrapper.appendChild(filmContainer);
        });

        section.appendChild(wrapper);

        if (i + 2 < films.length) {
            const hr = document.createElement("hr");
            section.appendChild(hr);
        }
    }

    const deleteButtons = document.querySelectorAll(".delete__button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", async function () {
            await deleteFilm(this);
            const updatedFilms = await getAllFilms();
            renderFilms(updatedFilms);
        });
    });
};

export default renderFilms;

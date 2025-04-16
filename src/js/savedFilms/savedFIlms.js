import getAllFilms from "../filmOperations/getAllFilms.js";
import renderFilms from "./renderFilms.js";

document.addEventListener("DOMContentLoaded", async () => {
    const films = await getAllFilms();
    renderFilms(films);
});

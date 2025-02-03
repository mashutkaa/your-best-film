const saveFilm = () => {
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".save-film");

        if (!button) return;

        if (!localStorage.getItem("token")?.trim()) {
            alert("Авторизуйтеся, щоб зберегти фільм");
        } else {
            alert("Вибачте, функціонал наразі не доступний");
        }
    });
};

export default saveFilm;

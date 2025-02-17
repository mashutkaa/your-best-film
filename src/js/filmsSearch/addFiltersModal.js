const addFiltersModal = () => {
    console.log("filter modal");

    // Отримуємо елементи
    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("filtersModal");
    const closeBtn = document.getElementById("closeBtn");
    const filtersForm = document.getElementById("filtersForm");

    // Відкриваємо модальне вікно при натисканні на кнопку
    openModalBtn.onclick = function () {
        modal.style.display = "flex";
    };

    // Закриваємо модальне вікно при натисканні на хрестик
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Закриваємо модальне вікно при натисканні за його межами
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Обробник відправки форми
    filtersForm.onsubmit = function (event) {
        event.preventDefault();
        const genre = document.getElementById("genre").value;
        const year = document.getElementById("year").value;
        const rating = document.getElementById("rating").value;

        alert(`Фільтри: Жанр - ${genre}, Рік - ${year}, Рейтинг - ${rating}`);
        modal.style.display = "none";
    };
};

export default addFiltersModal();

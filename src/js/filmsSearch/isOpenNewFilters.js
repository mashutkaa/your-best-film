const isOpenNewFilters = () => {
    console.log("modal isOpenNewFilters");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector("[data-close]");
    const radioButtons = document.querySelectorAll(".radio-button-field");

    modal.style.display = "block";

    // Функція для закриття модального вікна
    function closeModal() {
        modal.style.display = "none";
    }

    // Додаємо обробник події на кнопку закриття
    closeButton.addEventListener("click", closeModal);

    // Закриваємо модальне вікно при кліку поза його межами
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    radioButtons.forEach((button) => {
        button.addEventListener("change", () => {
            console.log("Вибрано: " + button.value);
        });
    });
};

export default isOpenNewFilters;

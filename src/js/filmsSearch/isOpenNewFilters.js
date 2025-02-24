const isOpenNewFilters = (callback) => {
  console.log("modal isOpenNewFilters");
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector("[data-close]");
  const radioButtons = document.querySelectorAll(".radio-button-field");

  modal.style.display = "block";

  function closeModal() {
    modal.style.display = "none";
  }

  closeButton.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  radioButtons.forEach((button) => {
    button.addEventListener("change", () => {
      console.log("Вибрано: " + button.value);
      const isNewFilters = button.value === "Так";
      modal.style.display = "none"; 
      callback(isNewFilters); 
    });
  });
};

export default isOpenNewFilters;

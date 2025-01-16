document.addEventListener("keydown", (e) => {
  const focusableElements = Array.from(
    document.querySelectorAll(".tabQuestion")
  );
  const currentIndex = focusableElements.indexOf(document.activeElement);

  // Стрілки вгору/вниз для переходу між питаннями
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();

    const step = e.key === "ArrowDown" ? 1 : -1;
    let nextIndex = currentIndex + step;

    // Обмеження на початку та кінці списку
    if (nextIndex < 0) nextIndex = focusableElements.length - 1;
    if (nextIndex >= focusableElements.length) nextIndex = 0;

    focusableElements[nextIndex].focus();
  }

  // Стрілки вправо/вліво для переходу між радіо або чекбоксами
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const currentElement = document.activeElement;
    const groupName = currentElement.name;

    if (groupName) {
      const groupElements = Array.from(
        document.querySelectorAll(`[name="${groupName}"]`)
      );
      const groupIndex = groupElements.indexOf(currentElement);

      if (groupIndex !== -1) {
        e.preventDefault();

        const step = e.key === "ArrowRight" ? 1 : -1;
        let nextIndex = groupIndex + step;

        // Обмеження на початку та кінці групи
        if (nextIndex < 0) nextIndex = groupElements.length - 1;
        if (nextIndex >= groupElements.length) nextIndex = 0;

        groupElements[nextIndex].focus();
      }
    }
  }

  // Вибір елемента при натисканні Enter
  if (e.key === "Enter") {
    const currentElement = document.activeElement;

    if (
      currentElement.tagName === "LABEL" &&
      currentElement.querySelector("input") 
    ) {
      const input = currentElement.querySelector("input");
      if (input.type === "radio" || input.type === "checkbox") {
        input.checked = true; 
        input.dispatchEvent(new Event("change")); 
      }
      input.focus(); 
    } else if (
      currentElement.tagName === "BUTTON" ||
      (currentElement.tagName === "DIV" &&
        currentElement.classList.contains("tabQuestion")) ||
      (currentElement.tagName === "INPUT" &&
        (currentElement.type === "radio" || currentElement.type === "checkbox"))
    ) {
      currentElement.click(); 
    }
  }

});

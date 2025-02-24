import newFilters from "./newFilters";
import isOpenNewFilters from "./isOpenNewFilters";

const filmsSearch = () => {
  const shortQuestions = [
    {
      type: "radio-mood",
      question: "Який настрій у вас сьогодні?",
      answers: ["Чудовий", "Нудно", "Сумний", "Втомлений"],
      img: [
        "img/5307603774627505126 1@2x.png",
        "img/5307603774627505123 1@2x.png",
        "img/5307603774627505125 1@2x.png",
        "img/5307603774627505124 1@2x.png",
      ],
      needs: true,
    },

    {
      type: "range",
      question: "Оберіть тривалість фільму",
      answers: ["0 хв", "1 год.", "3 год.", "5 год.", "7 год."],
      needs: true,
    },

    {
      type: "radio",
      question: "З ким переглядатимете фільм?",
      answers: [
        "Наодинці",
        "З друзями",
        "З другою половинкою",
        "З родиною (разом з дітьми)",
      ],
      needs: true,
    },

    {
      type: "input-fields",
      question: "Роки виходу фільму",
      answers: ["Не раніше", "Не пізніше"],
      placeholder: ["1950", "Поточний рік"],
      needs: false,
    },

    {
      type: "checkbox",
      question: "У якому жанрі шукатимемо фільм?",
      answers:
        "Драма, комедія, бойовик, трилер, жахи, фантастика, фентезі, пригоди, мелодрама, документальний фільм, вестерн, історичний фільм, кримінал, мюзикл, анімаційний фільм, спортивний фільм, сімейний фільм, комедійний бойовик, науково-фантастичний трилер, романтична фантастика, пригодницьке фентезі",
      default: "Вибрати жанр",
      needs: false,
    },
  ];

  let isModalOpen;

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalOverlay = document.querySelector(".modal-overlay"),
    modalCloseBtn = document.querySelector("[data-close]");

  //відкрити модалку
  function openModal() {
    isModalOpen = true;
    modal.classList.add("show");
    modalOverlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Заблокувати прокручування
  }
  // Закрити модалку
  function closeModal() {
    isModalOpen = false;
    modal.classList.remove("show");
    modalOverlay.classList.remove("show");
    document.body.style.overflow = ""; // Відновити прокручування

    // Показати опитування та прибрати спінер
    const formWrapper = document.querySelector(".form-wrapper");
    formWrapper.classList.remove("hide");

    const spinnerContainer = document.querySelector(".spinner-container");
    if (spinnerContainer) {
      spinnerContainer.remove();
    }
  }

  const formContainer = document.querySelector(".form");

  const submitButton = document.createElement("button");
  submitButton.classList.add("button", "submit-btn");
  submitButton.type = "submit";
  submitButton.textContent = "Отримати добірку фільмів";

  // Обробники подій для кнопок
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  // Закриття модалки при натисканні на оверлей
  modalOverlay.addEventListener("click", closeModal);

  // Закриття модалки при натисканні клавіші Escape
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  // ---------------------------- Модальне вікно

  // Коротке опитування

  formContainer.innerHTML = "";

  showQuestion(shortQuestions);

  // Показати запитання
  function showQuestion(questions) {
    formContainer.innerHTML = "";

    console.log("showQuestion");

    questions.forEach((element, index) => {
      const headerContainer = document.createElement("div");
      headerContainer.classList.add("question-wrapper");

      //номер запитання
      const numberTemplate = `<div class="question-number-container">
                    <span class="question-number">${index + 1}</span>
                </div>      `;
      headerContainer.innerHTML = numberTemplate;

      const questionContainer = document.createElement("div");
      questionContainer.classList.add("question-item");

      // перевірка чи обов'язкове запитання та виведення назви запитання
      let questionTemplate = "";

      if (element.needs) {
        questionTemplate += `<p class="required-field">*поле обов’язкове</p>`;
      }
      questionTemplate += `<p class="question">${element.question}</p>`;

      questionContainer.innerHTML = questionTemplate;

      //  відповіді
      switch (element["type"]) {
        case "radio-mood": {
          const { img, answers } = element;
          const lengthArray = answers.length;

          const moodWrapper = document.createElement("div");
          questionContainer.appendChild(moodWrapper);
          moodWrapper.classList = "mood-options";

          let isMoodDefault;
          for (let i = 0; i < lengthArray; i++) {
            const savedMood = localStorage.getItem("radioMood");
            if (savedMood) {
              isMoodDefault = answers[i] === savedMood;
            } else {
              isMoodDefault = answers[i] === "Чудовий";
            }
            const answerTemplate = `
                            <label class="mood-option" >
                                <input type="radio" name="mood" value="${
                                  answers[i]
                                }" ${
              isMoodDefault ? "checked" : ""
            } tabindex="0" />
                                <div class="icon tabQuestion" tabindex="0">
                                    <img src="${img[i]}" alt="" />
                                </div>
                                <span>${answers[i]}</span>
                            </label>`;
            moodWrapper.innerHTML += answerTemplate;
          }

          break;
        }

        case "radio": {
          let isPartnerDefault;
          for (let answerText of element.answers) {
            const savedValue = localStorage.getItem("radio");
            if (savedValue) {
              isPartnerDefault = answerText === savedValue;
            } else {
              isPartnerDefault = answerText === "Наодинці";
            }

            const answerTemplate = `
                            <label class="radio-button-label tabQuestion" tabindex="0">
                                <input class="radio-button-field " type="radio" name="movie-partner" value="${answerText}" ${
              isPartnerDefault ? "checked" : ""
            }  tabindex="0" />
                                <span>${answerText}</span>
                            </label>`;
            questionContainer.innerHTML += answerTemplate;
          }
          break;
        }

        case "range": {
          const sliderTemplate = `   <div class = "slider-group">
                            <input id="lower-slider" class="lower-range-slider tabQuestion" type="range" min="0" max="7" step="1" value="0" required tabindex="0"/>
                            <input id="upper-slider" class="upper-range-slider tabQuestion" type="range" min="0" max="7" step="1" value="7" required tabindex="0"/>
                        </div>
                        <div class="slider-labels"></div>`;
          questionContainer.innerHTML += sliderTemplate;

          const sliderContainer =
            questionContainer.querySelector(".slider-labels");

          element.answers.forEach((labelText, index) => {
            const labelElement = document.createElement("span");
            labelElement.textContent = labelText;

            sliderContainer.appendChild(labelElement);
          });

          break;
        }

        case "input-fields": {
          const answerArray = element.answers;
          const placeholderArray = element.placeholder;
          const lengthArray = answerArray.length;

          const savedValues = [];

          // Спочатку відновлюємо збережені значення з localStorage
          for (let i = 0; i < lengthArray; i++) {
            const savedValue = localStorage.getItem(`input-field-${i}`);
            savedValues[i] = savedValue ? savedValue : ""; // Якщо значення є, зберігаємо його, якщо ні - порожній рядок
          }

          // Створюємо інпут-поля
          for (let i = 0; i < lengthArray; i++) {
            const answerTemplate = `
             <p name="error-year-${i}" class="error-message-container"></p>
              <label class="input-field-label">
                <span>${answerArray[i]}</span>
                <input class="text-input-field tabQuestion" type="text" placeholder="${placeholderArray[i]}" name="year-min-${i}" pattern="\\d{4}"
                      value="${savedValues[i]}" tabindex="0" /> <!-- Підставляємо значення із savedValues -->
              </label>
            `;

            questionContainer.innerHTML += answerTemplate;
          }

          break;
        }
        case "checkbox": {
          const options = element.answers
            .split(", ")
            .map((e) => e[0].toUpperCase() + e.slice(1));

          const checkboxWrapper = document.createElement("div");
          checkboxWrapper.className = "checkbox-options";

          const savedOptions = localStorage.getItem("selectedOptions");
          const savedOptionsArray = savedOptions ? savedOptions.split(",") : [];

          options.forEach((option) => {
            const isChecked = savedOptionsArray.includes(option);

            const answerTemplate = ` 
              <label class="checkbox-button-label tabQuestion" tabindex="0">
                <input class="checkbox-button-field " type="checkbox" name="genre" value="${option}" ${
              isChecked ? "checked" : ""
            } tabindex="0" />
                <span>${option}</span>
              </label>`;
            checkboxWrapper.innerHTML += answerTemplate;
          });

          questionContainer.appendChild(checkboxWrapper);
          break;
        }
      }

      formContainer.appendChild(headerContainer);
      headerContainer.appendChild(questionContainer);
    });

    formContainer.appendChild(submitButton);
  }

  let result = [];

  // local Storage

  const radioImgs = document.querySelectorAll(
    '.mood-option input[type="radio"]'
  ); // Отримуємо всі радіокнопки
  radioImgs.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const selectedMood = event.target.value; // Отримуємо значення вибраного елемента
      localStorage.setItem("radioMood", selectedMood);
    });
  });

  const radioFields = document.querySelectorAll(".radio-button-field");
  radioFields.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const selectedRadio = event.target.value;
      localStorage.setItem("radio", selectedRadio);
    });
  });

  const inputFields = document.querySelectorAll(".text-input-field");
  inputFields.forEach((input, index) => {
    input.addEventListener("input", () => {
      localStorage.setItem(`input-field-${index}`, input.value); // Зберігаємо значення у localStorage
    });
  });

  const checkboxFields = document.querySelectorAll(".checkbox-button-field");
  checkboxFields.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedOptions = [];
      checkboxFields.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedOptions.push(checkbox.value); // Додаємо вибрані значення в масив
        }
      });
      localStorage.setItem("selectedOptions", selectedOptions.join(",")); // Зберігаємо вибрані опції як рядок, розділений комами
    });
  });

  const lowerSlider = document.querySelector("#lower-slider");
  const upperSlider = document.querySelector("#upper-slider");

  lowerSlider.addEventListener("input", () => {
    localStorage.setItem("lowerSliderValue", lowerSlider.value); // Зберігаємо значення нижнього слайдера
  });

  upperSlider.addEventListener("input", () => {
    localStorage.setItem("upperSliderValue", upperSlider.value); // Зберігаємо значення верхнього слайдера
  });

  // повідомлення про статус обробки відповідей користувача
  const message = {
    loading: "../src/icons/spinner.svg",
    errorInLoading: "Вибачте, на жаль, сталася помилка",
  };

  // повідомлення про помилку

  function errorMessage() {
    const formWrapper = document.querySelector(".form-wrapper");
    formWrapper.classList.add("hide"); // Ховаємо опитування

    const modalContainer = document.querySelector(".modal-wrapper");

    // контейнер для помилки
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("question-item");
    const errorTemplate = `<p class="question">${message.errorInLoading}</p>`;
    errorContainer.innerHTML += errorTemplate;

    modalContainer.appendChild(errorContainer);

    modalCloseBtn.addEventListener("click", () => {
      errorContainer.remove();
      formWrapper.classList.remove("hide");
      closeModal();
      showQuestion(shortQuestions);
    });
  }

  // запит до gpt
  async function getMovieRecommendations(sandbox = true) {
    console.log("Відправка запиту...");

    // Створити контейнер для спінера
    const formWrapper = document.querySelector(".form-wrapper");
    formWrapper.classList.add("hide");

    //const modalContainer = document.querySelector(".modal-wrapper");
    const modalContainer = document.querySelector(".modal");

    // Створити контейнер для спінера
    const spinnerContainer = document.createElement("div");
    spinnerContainer.classList.add("spinner-container");

    // Додати спінер
    const spinnerImg = document.createElement("img");
    spinnerImg.src = message.loading;
    spinnerImg.alt = "Loading...";
    spinnerContainer.appendChild(spinnerImg);

    // Додати спінер у модальне вікно
    modalContainer.appendChild(spinnerContainer);

    try {
      const requestBody = {
        result: result,
        sandbox: sandbox,
      };

      const response = await fetch(
        "http://localhost:3000/movies/getMoviesRecommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Якщо модальне вікно було закрите та спінер не крутиться то зупинити запит
      if (!spinnerContainer.isConnected) {
        console.log("Обробка запиту зупинена.");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error: " + errorText);
        errorMessage();
        return;
      }
      // recommendations - масив з об'єктами
      const recommendations = await response.json();
      closeModal();
      // Збереження рекомендацій у localStorage
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
      // Відкриття нової сторінки
      window.location.href = "result-page.html";
    } catch (error) {
      console.error("Помилка при завантаженні:", error);
      errorMessage();
      return;
    } finally {
      if (spinnerContainer.isConnected) {
        spinnerContainer.remove();
      }
    }
  }

  function sendResults(questions) {
    result = [];

    questions.forEach((element) => {
      const { type, question } = element;

      let answer = "";

      switch (type) {
        case "radio-mood": {
          const getAnswer =
            document.querySelector('input[name="mood"]:checked')?.value || null;

          answer = `${getAnswer}`;
          break;
        }

        case "range": {
          const answerLower = document.querySelector("#lower-slider").value;
          const answerUpper = document.querySelector("#upper-slider").value;

          answer = `Від ${answerLower} до ${answerUpper}`;

          break;
        }

        case "radio": {
          const getAnswer =
            document.querySelector('input[name="movie-partner"]:checked')
              ?.value || null;

          answer = `${getAnswer}`;
          break;
        }

        case "input-fields": {
          const minYearDefault = 1950;
          const maxYearDefault = new Date().getFullYear();
          const answerMin =
            document.querySelector('input[name="year-min-0"]')?.value ||
            minYearDefault;
          const answerMax =
            document.querySelector('input[name="year-min-1"]')?.value ||
            maxYearDefault;

          answer = `Не раніше: ${answerMin}, не пізніше: ${answerMax}`;
          break;
        }

        case "checkbox": {
          const selectedGenres = Array.from(
            document.querySelectorAll('input[name="genre"]:checked')
          ).map((checkbox) => checkbox.value);

          if (selectedGenres.length === 0) {
            answer = element.answers
              .split(", ")
              .map((e) => e[0].toUpperCase() + e.slice(1))
              .join(", ");
          } else {
            answer = selectedGenres.join(", ");
          }
          break;
        }
      }

      const newUserAnswer = {
        question: question,
        answer: answer,
      };
      result.push(newUserAnswer);
    });

    console.log(result);
    getMovieRecommendations(false);
  }

  const errorInputMin = document.querySelector(' p[name="error-year-0"]');
  const errorInputMax = document.querySelector(' p[name="error-year-1"]');
  const yearInputMin = document.querySelector('input[name="year-min-0"]');
  const yearInputMax = document.querySelector('input[name="year-min-1"]');

  // ВАЛІДАЦІЯ
  function validateYears() {
    const yearMin = yearInputMin.value.trim();
    const yearMax = yearInputMax.value.trim();
    const currentYear = new Date().getFullYear();

    let isValid = true;

    errorInputMin.style.display = "none";
    errorInputMax.style.display = "none";
    yearInputMin.style.border = "1px solid white";
    yearInputMax.style.border = "1px solid white";

    if (yearInputMin.validity.valid && yearInputMax.validity.valid) {
      errorInputMin.style.display = "none";
      errorInputMax.style.display = "none";
      yearInputMin.style.border = "1px solid white";
      yearInputMax.style.border = "1px solid white";
      isValid = true;
    }

    // Перевірка: чи введене значення містить рівно 4 цифри
    if (Number(yearMin).toString().length !== 4) {
      errorInputMin.style.display = "block";
      yearInputMin.style.border = "1px solid red";
      errorInputMin.textContent = "Введіть правильний рік";
      isValid = false;
    }
    if (Number(yearMax).toString().length !== 4) {
      errorInputMax.style.display = "block";
      yearInputMax.style.border = "1px solid red";
      errorInputMax.textContent = "Введіть правильний рік";
      isValid = false;
    }

    if (isNaN(yearMin)) {
      errorInputMin.style.display = "block";
      errorInputMin.textContent = "Введіть числове значення";
      yearInputMin.style.border = "1px solid red";
      isValid = false;
    }
    if (isNaN(yearMax)) {
      errorInputMax.style.display = "block";
      errorInputMax.textContent = "Введіть числове значення";
      yearInputMax.style.border = "1px solid red";
      isValid = false;
    }

    // Перевірка: чи порядок років коректний
    if (Number(yearMin) > Number(yearMax)) {
      errorInputMin.style.display = "block";
      errorInputMax.style.display = "block";
      yearInputMin.style.border = "1px solid red";
      yearInputMax.style.border = "1px solid red";
      errorInputMin.textContent = "Перший рік має бути менший за другий";
      isValid = false;
    }

    // Перевірка: чи відповідають роки заданим межам
    if (Number(yearMin) < 1950) {
      errorInputMin.style.display = "block";
      yearInputMin.style.border = "1px solid red";
      errorInputMin.textContent = "Рік не може бути меншим за 1950";
      isValid = false;
    }
    if (Number(yearMax) > currentYear) {
      errorInputMax.style.display = "block";
      yearInputMax.style.border = "1px solid red";
      errorInputMax.textContent = `Рік не може бути більше ${currentYear} року`;
      isValid = false;
    }
    if (yearMin === "") {
      yearInputMin.value = Number(1950);
      errorInputMin.style.display = "none";
      yearInputMin.style.border = "1px solid white";
      if (validateYears()) {
        isValid = true;
      }
    }
    if (yearMax === "") {
      yearInputMax.value = currentYear;
      errorInputMax.style.display = "none";
      yearInputMax.style.border = "1px solid white";
      if (validateYears()) {
        isValid = true;
      }
    }

    return isValid;
  }

  // Валідація повзунків
  const minSlider = document.querySelector("#lower-slider");
  const maxSlider = document.querySelector("#upper-slider");

  const minGap = 1;

  minSlider.addEventListener("input", () => {
    if (parseInt(minSlider.value) >= parseInt(maxSlider.value) - minGap) {
      minSlider.value = parseInt(maxSlider.value) - minGap;
    }
  });
  maxSlider.addEventListener("input", () => {
    if (parseInt(maxSlider.value) <= parseInt(minSlider.value) + minGap) {
      maxSlider.value = parseInt(minSlider.value) + minGap;
    }
  });

  const isOpenNewFiltersModalWindow = document.querySelector(
    "#isOpenNewFiltersModalWindow"
  );
  const surveyModalWrapper = document.querySelector("#surveyModal");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateYears()) {
      // Зберігаємо токен аутентифікації перед очищенням localStorage

      isOpenNewFiltersModalWindow.style.display = "block";

      //   // це змінна, чи відкрити додаткові фільтри чи ні
      let isNewFilters;
      let newResults = [];

      isOpenNewFilters((isNewFilters) => {
        if (isNewFilters) {
          surveyModalWrapper.style.display = "flex";
          newFilters();
        } else {
          // тут відправка результатів
          sendResults(shortQuestions); // Якщо "Ні", відправляємо результати
        }

        result.push(...newResults);
        console.log(result);

        const authToken = localStorage.getItem("token");
        localStorage.clear();

        if (authToken) {
          localStorage.setItem("token", authToken);
        }

        showQuestion(shortQuestions);
      });
    }
  });
};

export default filmsSearch;

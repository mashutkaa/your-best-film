// запитання
console.log(printResults);

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

window.addEventListener("DOMContentLoaded", function () {

  // ---------------------------- Модальне вікно

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalOverlay = document.querySelector(".modal-overlay"),
    modalCloseBtn = document.querySelector("[data-close]");

  //відкрити модалку
  function openModal() {
    modal.classList.add("show");
    modalOverlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Заблокувати прокручування
  }
  // Закрити модалку
  function closeModal() {
    modal.classList.remove("show");
    modalOverlay.classList.remove("show");
    document.body.style.overflow = ""; // Відновити прокручування
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

  // Коротке опитуванняі

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
                            <label class="mood-option">
                                <input type="radio" name="mood" value="${
                                  answers[i]
                                }" ${isMoodDefault ? "checked" : ""} />
                                <div class="icon">
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
            <label class="radio-button-label">
                <input class="radio-button-field" type="radio" name="movie-partner" value="${answerText}" ${
              isPartnerDefault ? "checked" : ""
            } />
                <span>${answerText}</span>
            </label>`;
            questionContainer.innerHTML += answerTemplate;
          }
          break;
        }

        case "range": {
          const sliderTemplate = `   <div class = "slider-group">
                            <input id="lower-slider" class="lower-range-slider" type="range" min="0" max="7" step="1" value="0" required />
                            <input id="upper-slider" class="upper-range-slider" type="range" min="0" max="7" step="1" value="7" required />
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
            
              <label class="input-field-label">
                <span>${answerArray[i]}</span>
                <input class="text-input-field" type="text" placeholder="${placeholderArray[i]}" name="year-min-${i}" pattern="\\d{4}"
                      value="${savedValues[i]}" /> <!-- Підставляємо значення із savedValues -->
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
              <label class="checkbox-button-label">
                <input class="checkbox-button-field" type="checkbox" name="genre" value="${option}" ${
              isChecked ? "checked" : ""
            } />
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

    // Створити контейнер для помилки
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("question-item");
    const errorTemplate = `<p class="question">${message.errorInLoading}</p>`;
    errorContainer.innerHTML += errorTemplate;

    modalContainer.appendChild(errorContainer);

    modalCloseBtn.addEventListener("click", () => {
      errorContainer.remove(); // Видаляємо помилку
      formWrapper.classList.remove("hide");
      closeModal();
      showQuestion(shortQuestions);
    });
  }

  // запит до gpt
  async function getMovieRecommendations(sandbox = true) {
    console.log("Відправка запиту...");

    const spinnerContainer = document.createElement("div");
    spinnerContainer.id = "spinner-container";

    const spinnerImg = document.createElement("img");
    spinnerImg.src = message.loading;
    spinnerImg.alt = "Loading...";
    spinnerContainer.appendChild(spinnerImg);
    document.body.appendChild(spinnerContainer);

    try {
      const requestBody = {
        result: result,
        sandbox: sandbox,
      };

      const response = await fetch(
        "http://localhost:3000/api/getMovieRecommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

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
      localStorage.setItem('recommendations', JSON.stringify(recommendations));
      // Відкриття нової сторінки
      window.location.href = 'result-page.html';

    } catch (error) {
      console.error("Помилка при завантаженні:", error);
      errorMessage();
      return;
    } finally {
      spinnerContainer.remove();
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
            document.querySelector('input[name="year-min-0"]')?.value || minYearDefault;
          const answerMax =
            document.querySelector('input[name="year-min-1"]')?.value || maxYearDefault;

          answer = `Не раніше: ${answerMin}, не пізніше: ${answerMax}`;
          break;
        }

        case "checkbox": {
          console.log('Збереження почалося');
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
    getMovieRecommendations((sandbox = false));
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

    let isValid = false;

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
    if (yearMin.length !== 4) {
      errorInputMin.style.display = "block";
      yearInputMin.style.border = "1px solid red";
      errorInputMin.textContent = "Введіть правильний рік";
      isValid = false;
    }
    if (yearMax.length !== 4) {
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
    if (yearMin > yearMax) {
      errorInputMin.style.display = "block";
      errorInputMax.style.display = "block";
      yearInputMin.style.border = "1px solid red";
      yearInputMax.style.border = "1px solid red";
      errorInputMin.textContent = "Перший рік має бути менший за другий";
      isValid = false;
    }

    // Перевірка: чи відповідають роки заданим межам
    if (yearMin < 1950) {
      errorInputMin.style.display = "block";
      yearInputMin.style.border = "1px solid red";
      errorInputMin.textContent = "Рік не може бути меншим за 1950";
      isValid = false;
    }
    if (yearMax > currentYear) {
      errorInputMax.style.display = "block";
      yearInputMax.style.border = "1px solid red";
      errorInputMax.textContent = `Рік не може бути більше ${currentYear} року`;
      isValid = false;
    }
    if (yearMin === "") {
      yearInputMin.value = 1950;
      errorInputMin.style.display = "none";
      yearInputMin.style.border = "1px solid white";
      if (validateYears()) {
          return isValid = true;
      }
     
    }
    if (yearMax === "") {
      yearInputMax.value = currentYear;
      errorInputMax.style.display = "none";
      yearInputMax.style.border = "1px solid white";
     if (validateYears()) {
       return (isValid = true);
     }
    }

    return isValid; // Якщо помилок немає
  }

  // function validateYears() {
  //   const yearInputMin = document.querySelector("#yearInputMin"); // Заміна на коректний селектор
  //   const yearInputMax = document.querySelector("#yearInputMax"); // Заміна на коректний селектор
  //   const errorInputMin = document.querySelector("#errorInputMin");
  //   const errorInputMax = document.querySelector("#errorInputMax");

  //   if (!yearInputMin || !yearInputMax || !errorInputMin || !errorInputMax) {
  //     console.error("Не вдалося знайти необхідні елементи у DOM");
  //     return false;
  //   }

  //   const yearMin = yearInputMin.value.trim();
  //   const yearMax = yearInputMax.value.trim();
  //   const currentYear = new Date().getFullYear();

  //   let isValid = true;

  //   // Скидання стилів і помилок
  //   errorInputMin.style.display = "none";
  //   errorInputMax.style.display = "none";
  //   yearInputMin.style.border = "1px solid white";
  //   yearInputMax.style.border = "1px solid white";

  //   // Перевірка на валідність
  //   if (yearMin.length !== 4 || isNaN(yearMin)) {
  //     errorInputMin.style.display = "block";
  //     yearInputMin.style.border = "1px solid red";
  //     errorInputMin.textContent = isNaN(yearMin) 
  //       ? "Введіть числове значення" 
  //       : "Введіть правильний рік";
  //     isValid = false;
  //   }

  //   if (yearMax.length !== 4 || isNaN(yearMax)) {
  //     errorInputMax.style.display = "block";
  //     yearInputMax.style.border = "1px solid red";
  //     errorInputMax.textContent = isNaN(yearMax) 
  //       ? "Введіть числове значення" 
  //       : "Введіть правильний рік";
  //     isValid = false;
  //   }

  //   // Перевірка порядку років
  //   if (isValid && +yearMin > +yearMax) {
  //     errorInputMin.style.display = "block";
  //     errorInputMax.style.display = "block";
  //     yearInputMin.style.border = "1px solid red";
  //     yearInputMax.style.border = "1px solid red";
  //     errorInputMin.textContent = "Перший рік має бути менший за другий";
  //     isValid = false;
  //   }

  //   // Перевірка меж років
  //   if (isValid && +yearMin < 1950) {
  //     errorInputMin.style.display = "block";
  //     yearInputMin.style.border = "1px solid red";
  //     errorInputMin.textContent = "Рік не може бути меншим за 1950";
  //     isValid = false;
  //   }

  //   if (isValid && +yearMax > currentYear) {
  //     errorInputMax.style.display = "block";
  //     yearInputMax.style.border = "1px solid red";
  //     errorInputMax.textContent = `Рік не може бути більше ${currentYear} року`;
  //     isValid = false;
  //   }

  //   // Заповнення значень за замовчуванням
  //   if (!yearMin) {
  //     yearInputMin.value = 1950;
  //   }

  //   if (!yearMax) {
  //     yearInputMax.value = currentYear;
  //   }

  //   return isValid;
  // }



  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Зупинити відправку форми за замовчуванням

    // if (validateYears()) {
    //   sendResults(shortQuestions);
    //   localStorage.clear();
    //   showQuestion(shortQuestions);
    // }

    localStorage.clear();
    sendResults(shortQuestions);
    showQuestion(shortQuestions);
  });
});

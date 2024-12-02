// console.log('"hello":', "hello")

// запитання
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
    type: "option",
    question: "У якому жанрі шукатимемо фільм?",
    answers:
      "Драма, комедія, бойовик, трилер, жахи, фантастика, фентезі, пригоди, мелодрама, документальний фільм, вестерн, історичний фільм, кримінал, мюзикл, анімаційний фільм, спортивний фільм, сімейний фільм, комедійний бойовик, науково-фантастичний трилер, романтична фантастика, пригодницьке фентезі",
    default: "Вибрати жанр",
    needs: false,
  },
];

window.addEventListener("DOMContentLoaded", function () {
  // Модальне вікно

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("show");
      modal.classList.remove("hide");
      // document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    // document.body.style.overflow = '';
  }

  // закрити вікно, якщо натиснути на хрестик
  modalCloseBtn.addEventListener("click", closeModal);

  // закрити вікно, якщо натиснути поза ним
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // закрити вікно, якщо натиснути "Escape"
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // Коротке опитування

  const formContainer = document.querySelector(".form");

  // Очищення запитань
  formContainer.innerHTML = "";

  showQuestion(shortQuestions);

  // Показати запитання
  function showQuestion(questions) {
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

          for (let i = 0; i < lengthArray; i++) {
            const isMoodDefault = answers[i] === "Чудовий";
            const answerTemplate = `  <label class="mood-option">
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
          for (let answerText of element.answers) {
            const isPartnerDefault = answerText === "Наодинці";

            const answerTemplate = ` <label class="radio-button-label">
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

          // for (let i = 0; i < lengthArray; i++) {
          //   const answerTemplate =
          //                   <label class="input-field-label">
          //                       <span>${answerArray[i]}</span>
          //                   </label>
          //               ;

          //   questionContainer.innerHTML += answerTemplate;
          // }

          const answerTemplate = `  <label class="input-field-label">
                                <span>Не раніше</span>
                                <input id="year-min" class="text-input-field" type="number" placeholder="1950" name="year-min" pattern="\d{4}"  min="1950" max="2024"/>
                                   <div class="error-input-min"></div>
                            </label>
                             <label class="input-field-label">
                                <span>Не раніше</span>
                                <input  id="year-max" class="text-input-field" type="number" placeholder="поточний рік" name="year-max" pattern="\d{4}"  min="1950" max="2024" />
                                   <div class="error-input-max"></div>
                            </label>`;
          questionContainer.innerHTML += answerTemplate;

          break;
        }

        case "option": {
          const options = element.answers
            .split(", ")
            .map((e) => e[0].toUpperCase() + e.slice(1));

          const selectElement = document.createElement("select");
          selectElement.className = "genre-select";
          selectElement.name = "genre";

          const defaultOption = document.createElement("option");
          defaultOption.className = "genre-select-option";
          defaultOption.value = "";
          defaultOption.disabled = true;
          defaultOption.selected = true;
          defaultOption.textContent = `${element.default}`;
          selectElement.appendChild(defaultOption);

          options.forEach((answerText) => {
            const optionElement = document.createElement("option");
            optionElement.className = "genre-select-option";
            optionElement.textContent = answerText;
            selectElement.appendChild(optionElement);
          });

          questionContainer.appendChild(selectElement);
          break;
        }
      }

      formContainer.appendChild(headerContainer);
      headerContainer.appendChild(questionContainer);
    });
  }

  // кнопка для відправки результатів
  const submitButton = document.createElement("button");
  submitButton.classList.add("button", "submit-btn");
  submitButton.type = "submit";
  submitButton.textContent = "Отримати добірку фільмів";

  formContainer.appendChild(submitButton);

  let result = [];

  function getRandomMovie(index) {
    const genres = [
      "Комедія",
      "Драма",
      "Трилер",
      "Фантастика",
      "Мелодрама",
      "Бойовик",
      "Пригоди",
      "Анімація",
      "Документальний",
      "Жахи",
    ];
    const reasons = [
      "Цей фільм має захоплюючий сюжет.",
      "Цей фільм має чудову акторську гру.",
      "Цей фільм має вражаючі спецефекти.",
      "Цей фільм має глибокий сенс.",
      "Цей фільм має чудову музику.",
      "Цей фільм має непередбачуваний фінал.",
      "Цей фільм має цікаві персонажі.",
      "Цей фільм має гарну кінематографію.",
      "Цей фільм має багато гумору.",
      "Цей фільм має захоплюючі пригоди.",
    ];

    return {
      name: `Фільм ${index}`,
      genre: genres[Math.floor(Math.random() * genres.length)],
      year: `${2000 + Math.floor(Math.random() * 22)}`,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      rating: (Math.random() * 5).toFixed(1),
    };
  }

  async function printMovieRecommendations(sandbox = true) {
    console.log("Відправка запиту...");

    if (sandbox) {
      const movies = [];
      for (let i = 1; i <= 10; i++) {
        movies.push(getRandomMovie(i));
      }
      console.log(movies);
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/getMovieRecommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error: " + errorText);
      return;
    }

    const recommendations = await response.json();
    console.log(recommendations);
  }

  function sendResults(questions) {
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
          const answerMin = document.querySelector("#year-min").value || null;
          const answerMax = document.querySelector("#year-max").value || null;

          answer = `Не раніше ${answerMin}, не пізніше: ${answerMax}`;
          break;
        }

        case "option": {
          const answers =
            document.querySelector('select[name="genre"]').value || null;

          answer = `${answers}`;
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
    printMovieRecommendations();
  }

 const errorInputMin = document.querySelector(".error-input-min");
 const errorInputMax = document.querySelector(".error-input-max");
 const yearInputMin = document.querySelector("#year-min");
 const yearInputMax = document.querySelector("#year-max");

 // ВАЛІДАЦІЯ
 function validateYears() {
   const currentYear = new Date().getFullYear();
   const yearMin = yearInputMin.value.trim();
   const yearMax = yearInputMax.value.trim();
   let isValid = true;

   errorInputMin.style.display = "none";
   errorInputMax.style.display = "none";
   yearInputMin.style.border = "1px solid white";
   yearInputMax.style.border = "1px solid white";

   if (!yearMin) {
     yearInputMin.value = 1950;
     isValid = true;
   }
   if (!yearMax) {
     yearInputMax.value = currentYear;
     isValid = true;
   }

   if (yearInputMin.validity.valid && yearInputMax.validity.valid) {
     errorInputMin.style.display = "none";
     errorInputMax.style.display = "none";
     yearInputMin.style.border = "1px solid white";
     yearInputMax.style.border = "1px solid white";
     isValid = true;
   }

   if (yearMin > yearMax) {
     errorInputMin.style.display = "block";
     errorInputMax.style.display = "block";
     yearInputMin.style.border = "1px solid red";
     yearInputMax.style.border = "1px solid red";
     errorInputMin.textContent = "Перший рік має бути менший за другий";
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
   return isValid;
 }

 submitButton.addEventListener("click", (event) => {
   event.preventDefault();
   if (validateYears()) {
     sendResults(shortQuestions);
   }
 });
 
});

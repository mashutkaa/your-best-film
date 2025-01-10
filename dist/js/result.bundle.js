/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/js/result_page.js ***!
  \*******************************/
document.addEventListener('DOMContentLoaded', function (event) {
  // Отримання рекомендацій з localStorage
  var recommendations = JSON.parse(localStorage.getItem('recommendations'));
  // Виклик функція для заповнення сторінки рекомендаціями
  processRecommendations(recommendations);
});
function processRecommendations(recommendations) {
  // Видалення існуючих елементів на сторінці
  document.querySelectorAll('.films-table').forEach(function (el) {
    return el.remove();
  });
  document.querySelectorAll('hr').forEach(function (el) {
    return el.remove();
  });
  var mainContainer = document.querySelector('.main-container');

  // Створення елементів для відображення рекомендацій
  var recommendationsTables = [];
  var tempRecommendations = [];
  recommendations.forEach(function (recommendation, index) {
    tempRecommendations.push(recommendation);
    if (tempRecommendations.length === 2 || index === recommendations.length - 1) {
      recommendationsTables.push(tempRecommendations);
      tempRecommendations = [];
    }
  });
  var filmTableTemplate = "\n    <div class=\"films-table\">\n        <ul class=\"film-params\">\n            <li class=\"film-param\"><p>\u041D\u0430\u0437\u0432\u0430 \u0444\u0456\u043B\u044C\u043C\u0443:</p></li>\n            <li class=\"film-param\"><p>\u0416\u0430\u043D\u0440:</p></li>\n            <li class=\"film-param\"><p>\u0420\u0456\u043A \u0432\u0438\u043F\u0443\u0441\u043A\u0443:</p></li>\n            <li class=\"film-param\"><p>\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043E\u043F\u0438\u0441 \u0444\u0456\u043B\u044C\u043C\u0443:</p></li>\n        </ul>\n    </div>\n    ";
  console.log("dfcdsfv");
  recommendationsTables.forEach(function (recommendationsTable, index) {
    var filmsTable = document.createElement('div');
    filmsTable.classList.add('films-table');
    filmsTable.innerHTML = filmTableTemplate;
    recommendationsTable.forEach(function (recommendation) {
      var film = document.createElement('div');
      film.classList.add('film');
      var filmTitle = document.createElement('label');
      filmTitle.classList.add('custom-checkbox');
      filmTitle.innerHTML = "\n            <input class=\"film-title\" type=\"checkbox\">\n            <svg class=\"icon\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                <path d=\"M6 0v32l10-10 10 10v-32z\"></path>\n            </svg>\n            <span class=\"film-value\">\n                \"".concat(recommendation.name, "\" <span class=\"film-rating\">").concat(recommendation.rating, "</span>\n            </span>\n            ");
      var filmGenre = document.createElement('p');
      filmGenre.classList.add('film-value');
      filmGenre.textContent = recommendation.genre;
      var filmYear = document.createElement('p');
      filmYear.classList.add('film-value');
      filmYear.textContent = recommendation.year;
      var filmReason = document.createElement('p');
      filmReason.classList.add('film-value');
      filmReason.textContent = recommendation.reason;
      film.appendChild(filmTitle);
      film.appendChild(filmGenre);
      film.appendChild(filmYear);
      film.appendChild(filmReason);
      filmsTable.appendChild(film);
    });
    mainContainer.appendChild(filmsTable);
    if (index !== recommendationsTables.length - 1) {
      var hr = document.createElement('hr');
      mainContainer.appendChild(hr);
    }
  });
}
/******/ })()
;
//# sourceMappingURL=result.bundle.js.map
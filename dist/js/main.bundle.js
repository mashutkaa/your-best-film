/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// запитання
console.log("printResults");
var shortQuestions = [{
  type: "radio-mood",
  question: "Який настрій у вас сьогодні?",
  answers: ["Чудовий", "Нудно", "Сумний", "Втомлений"],
  img: ["img/5307603774627505126 1@2x.png", "img/5307603774627505123 1@2x.png", "img/5307603774627505125 1@2x.png", "img/5307603774627505124 1@2x.png"],
  needs: true
}, {
  type: "range",
  question: "Оберіть тривалість фільму",
  answers: ["0 хв", "1 год.", "3 год.", "5 год.", "7 год."],
  needs: true
}, {
  type: "radio",
  question: "З ким переглядатимете фільм?",
  answers: ["Наодинці", "З друзями", "З другою половинкою", "З родиною (разом з дітьми)"],
  needs: true
}, {
  type: "input-fields",
  question: "Роки виходу фільму",
  answers: ["Не раніше", "Не пізніше"],
  placeholder: ["1950", "Поточний рік"],
  needs: false
}, {
  type: "checkbox",
  question: "У якому жанрі шукатимемо фільм?",
  answers: "Драма, комедія, бойовик, трилер, жахи, фантастика, фентезі, пригоди, мелодрама, документальний фільм, вестерн, історичний фільм, кримінал, мюзикл, анімаційний фільм, спортивний фільм, сімейний фільм, комедійний бойовик, науково-фантастичний трилер, романтична фантастика, пригодницьке фентезі",
  "default": "Вибрати жанр",
  needs: false
}];
window.addEventListener("DOMContentLoaded", function () {
  var isModalOpen;
  var modalTrigger = document.querySelectorAll("[data-modal]"),
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
    var formWrapper = document.querySelector(".form-wrapper");
    formWrapper.classList.remove("hide");
    var spinnerContainer = document.querySelector(".spinner-container");
    if (spinnerContainer) {
      spinnerContainer.remove();
    }
  }
  var formContainer = document.querySelector(".form");
  var submitButton = document.createElement("button");
  submitButton.classList.add("button", "submit-btn");
  submitButton.type = "submit";
  submitButton.textContent = "Отримати добірку фільмів";

  // Обробники подій для кнопок
  modalTrigger.forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  modalCloseBtn.addEventListener("click", closeModal);

  // Закриття модалки при натисканні на оверлей
  modalOverlay.addEventListener("click", closeModal);

  // Закриття модалки при натисканні клавіші Escape
  document.addEventListener("keydown", function (e) {
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
    questions.forEach(function (element, index) {
      var headerContainer = document.createElement("div");
      headerContainer.classList.add("question-wrapper");

      //номер запитання
      var numberTemplate = "<div class=\"question-number-container\">\n                    <span class=\"question-number\">".concat(index + 1, "</span>\n                </div>      ");
      headerContainer.innerHTML = numberTemplate;
      var questionContainer = document.createElement("div");
      questionContainer.classList.add("question-item");

      // перевірка чи обов'язкове запитання та виведення назви запитання
      var questionTemplate = "";
      if (element.needs) {
        questionTemplate += "<p class=\"required-field\">*\u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432\u2019\u044F\u0437\u043A\u043E\u0432\u0435</p>";
      }
      questionTemplate += "<p class=\"question\">".concat(element.question, "</p>");
      questionContainer.innerHTML = questionTemplate;

      //  відповіді
      switch (element["type"]) {
        case "radio-mood":
          {
            var img = element.img,
              answers = element.answers;
            var lengthArray = answers.length;
            var moodWrapper = document.createElement("div");
            questionContainer.appendChild(moodWrapper);
            moodWrapper.classList = "mood-options";
            var isMoodDefault;
            for (var i = 0; i < lengthArray; i++) {
              var savedMood = localStorage.getItem("radioMood");
              if (savedMood) {
                isMoodDefault = answers[i] === savedMood;
              } else {
                isMoodDefault = answers[i] === "Чудовий";
              }
              var answerTemplate = "\n                            <label class=\"mood-option\" >\n                                <input type=\"radio\" name=\"mood\" value=\"".concat(answers[i], "\" ").concat(isMoodDefault ? "checked" : "", " tabindex=\"0\" />\n                                <div class=\"icon tabQuestion\" tabindex=\"0\">\n                                    <img src=\"").concat(img[i], "\" alt=\"\" />\n                                </div>\n                                <span>").concat(answers[i], "</span>\n                            </label>");
              moodWrapper.innerHTML += answerTemplate;
            }
            break;
          }
        case "radio":
          {
            var isPartnerDefault;
            var _iterator = _createForOfIteratorHelper(element.answers),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var answerText = _step.value;
                var savedValue = localStorage.getItem("radio");
                if (savedValue) {
                  isPartnerDefault = answerText === savedValue;
                } else {
                  isPartnerDefault = answerText === "Наодинці";
                }
                var _answerTemplate = "\n            <label class=\"radio-button-label tabQuestion\" tabindex=\"0\">\n                <input class=\"radio-button-field \" type=\"radio\" name=\"movie-partner\" value=\"".concat(answerText, "\" ").concat(isPartnerDefault ? "checked" : "", "  tabindex=\"0\" />\n                <span>").concat(answerText, "</span>\n            </label>");
                questionContainer.innerHTML += _answerTemplate;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            break;
          }
        case "range":
          {
            var sliderTemplate = "   <div class = \"slider-group\">\n                            <input id=\"lower-slider\" class=\"lower-range-slider tabQuestion\" type=\"range\" min=\"0\" max=\"7\" step=\"1\" value=\"0\" required tabindex=\"0\"/>\n                            <input id=\"upper-slider\" class=\"upper-range-slider tabQuestion\" type=\"range\" min=\"0\" max=\"7\" step=\"1\" value=\"7\" required tabindex=\"0\"/>\n                        </div>\n                        <div class=\"slider-labels\"></div>";
            questionContainer.innerHTML += sliderTemplate;
            var sliderContainer = questionContainer.querySelector(".slider-labels");
            element.answers.forEach(function (labelText, index) {
              var labelElement = document.createElement("span");
              labelElement.textContent = labelText;
              sliderContainer.appendChild(labelElement);
            });
            break;
          }
        case "input-fields":
          {
            var answerArray = element.answers;
            var placeholderArray = element.placeholder;
            var _lengthArray = answerArray.length;
            var savedValues = [];

            // Спочатку відновлюємо збережені значення з localStorage
            for (var _i = 0; _i < _lengthArray; _i++) {
              var _savedValue = localStorage.getItem("input-field-".concat(_i));
              savedValues[_i] = _savedValue ? _savedValue : ""; // Якщо значення є, зберігаємо його, якщо ні - порожній рядок
            }

            // Створюємо інпут-поля
            for (var _i2 = 0; _i2 < _lengthArray; _i2++) {
              var _answerTemplate2 = "\n             <p name=\"error-year-".concat(_i2, "\" class=\"error-message-container\"></p>\n              <label class=\"input-field-label\">\n                <span>").concat(answerArray[_i2], "</span>\n                <input class=\"text-input-field tabQuestion\" type=\"text\" placeholder=\"").concat(placeholderArray[_i2], "\" name=\"year-min-").concat(_i2, "\" pattern=\"\\d{4}\"\n                      value=\"").concat(savedValues[_i2], "\" tabindex=\"0\" /> <!-- \u041F\u0456\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0454\u043C\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0456\u0437 savedValues -->\n              </label>\n            ");
              questionContainer.innerHTML += _answerTemplate2;
            }
            break;
          }
        case "checkbox":
          {
            var options = element.answers.split(", ").map(function (e) {
              return e[0].toUpperCase() + e.slice(1);
            });
            var checkboxWrapper = document.createElement("div");
            checkboxWrapper.className = "checkbox-options";
            var savedOptions = localStorage.getItem("selectedOptions");
            var savedOptionsArray = savedOptions ? savedOptions.split(",") : [];
            options.forEach(function (option) {
              var isChecked = savedOptionsArray.includes(option);
              var answerTemplate = " \n              <label class=\"checkbox-button-label tabQuestion\" tabindex=\"0\">\n                <input class=\"checkbox-button-field \" type=\"checkbox\" name=\"genre\" value=\"".concat(option, "\" ").concat(isChecked ? "checked" : "", " tabindex=\"0\" />\n                <span>").concat(option, "</span>\n              </label>");
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
  var result = [];

  // local Storage

  var radioImgs = document.querySelectorAll('.mood-option input[type="radio"]'); // Отримуємо всі радіокнопки
  radioImgs.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
      var selectedMood = event.target.value; // Отримуємо значення вибраного елемента
      localStorage.setItem("radioMood", selectedMood);
    });
  });
  var radioFields = document.querySelectorAll(".radio-button-field");
  radioFields.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
      var selectedRadio = event.target.value;
      localStorage.setItem("radio", selectedRadio);
    });
  });
  var inputFields = document.querySelectorAll(".text-input-field");
  inputFields.forEach(function (input, index) {
    input.addEventListener("input", function () {
      localStorage.setItem("input-field-".concat(index), input.value); // Зберігаємо значення у localStorage
    });
  });
  var checkboxFields = document.querySelectorAll(".checkbox-button-field");
  checkboxFields.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      var selectedOptions = [];
      checkboxFields.forEach(function (checkbox) {
        if (checkbox.checked) {
          selectedOptions.push(checkbox.value); // Додаємо вибрані значення в масив
        }
      });
      localStorage.setItem("selectedOptions", selectedOptions.join(",")); // Зберігаємо вибрані опції як рядок, розділений комами
    });
  });
  var lowerSlider = document.querySelector("#lower-slider");
  var upperSlider = document.querySelector("#upper-slider");
  lowerSlider.addEventListener("input", function () {
    localStorage.setItem("lowerSliderValue", lowerSlider.value); // Зберігаємо значення нижнього слайдера
  });
  upperSlider.addEventListener("input", function () {
    localStorage.setItem("upperSliderValue", upperSlider.value); // Зберігаємо значення верхнього слайдера
  });

  // повідомлення про статус обробки відповідей користувача
  var message = {
    loading: "../src/icons/spinner.svg",
    errorInLoading: "Вибачте, на жаль, сталася помилка"
  };

  // повідомлення про помилку

  function errorMessage() {
    var formWrapper = document.querySelector(".form-wrapper");
    formWrapper.classList.add("hide"); // Ховаємо опитування

    var modalContainer = document.querySelector(".modal-wrapper");

    // контейнер для помилки
    var errorContainer = document.createElement("div");
    errorContainer.classList.add("question-item");
    var errorTemplate = "<p class=\"question\">".concat(message.errorInLoading, "</p>");
    errorContainer.innerHTML += errorTemplate;
    modalContainer.appendChild(errorContainer);
    modalCloseBtn.addEventListener("click", function () {
      errorContainer.remove();
      formWrapper.classList.remove("hide");
      closeModal();
      showQuestion(shortQuestions);
    });
  }

  // запит до gpt
  function getMovieRecommendations() {
    return _getMovieRecommendations.apply(this, arguments);
  }
  function _getMovieRecommendations() {
    _getMovieRecommendations = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var sandbox,
        formWrapper,
        modalContainer,
        spinnerContainer,
        spinnerImg,
        requestBody,
        response,
        errorText,
        recommendations,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            sandbox = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
            console.log("Відправка запиту...");

            // Створити контейнер для спінера
            formWrapper = document.querySelector(".form-wrapper");
            formWrapper.classList.add("hide");

            //const modalContainer = document.querySelector(".modal-wrapper");
            modalContainer = document.querySelector(".modal"); // Створити контейнер для спінера
            spinnerContainer = document.createElement("div");
            spinnerContainer.classList.add("spinner-container");

            // Додати спінер
            spinnerImg = document.createElement("img");
            spinnerImg.src = message.loading;
            spinnerImg.alt = "Loading...";
            spinnerContainer.appendChild(spinnerImg);

            // Додати спінер у модальне вікно
            modalContainer.appendChild(spinnerContainer);
            _context.prev = 12;
            requestBody = {
              result: result,
              sandbox: sandbox
            };
            _context.next = 16;
            return fetch("http://localhost:3000/movies/getMoviesRecommendations", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(requestBody)
            });
          case 16:
            response = _context.sent;
            if (spinnerContainer.isConnected) {
              _context.next = 20;
              break;
            }
            console.log("Обробка запиту зупинена.");
            return _context.abrupt("return");
          case 20:
            if (response.ok) {
              _context.next = 27;
              break;
            }
            _context.next = 23;
            return response.text();
          case 23:
            errorText = _context.sent;
            console.log("Error: " + errorText);
            errorMessage();
            return _context.abrupt("return");
          case 27:
            _context.next = 29;
            return response.json();
          case 29:
            recommendations = _context.sent;
            closeModal();
            // Збереження рекомендацій у localStorage
            localStorage.setItem("recommendations", JSON.stringify(recommendations));
            // Відкриття нової сторінки
            window.location.href = "result-page.html";
            _context.next = 40;
            break;
          case 35:
            _context.prev = 35;
            _context.t0 = _context["catch"](12);
            console.error("Помилка при завантаженні:", _context.t0);
            errorMessage();
            return _context.abrupt("return");
          case 40:
            _context.prev = 40;
            if (spinnerContainer.isConnected) {
              spinnerContainer.remove();
            }
            return _context.finish(40);
          case 43:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[12, 35, 40, 43]]);
    }));
    return _getMovieRecommendations.apply(this, arguments);
  }
  function sendResults(questions) {
    result = [];
    questions.forEach(function (element) {
      var type = element.type,
        question = element.question;
      var answer = "";
      switch (type) {
        case "radio-mood":
          {
            var _document$querySelect;
            var getAnswer = ((_document$querySelect = document.querySelector('input[name="mood"]:checked')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || null;
            answer = "".concat(getAnswer);
            break;
          }
        case "range":
          {
            var answerLower = document.querySelector("#lower-slider").value;
            var answerUpper = document.querySelector("#upper-slider").value;
            answer = "\u0412\u0456\u0434 ".concat(answerLower, " \u0434\u043E ").concat(answerUpper);
            break;
          }
        case "radio":
          {
            var _document$querySelect2;
            var _getAnswer = ((_document$querySelect2 = document.querySelector('input[name="movie-partner"]:checked')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value) || null;
            answer = "".concat(_getAnswer);
            break;
          }
        case "input-fields":
          {
            var _document$querySelect3, _document$querySelect4;
            var minYearDefault = 1950;
            var maxYearDefault = new Date().getFullYear();
            var answerMin = ((_document$querySelect3 = document.querySelector('input[name="year-min-0"]')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value) || minYearDefault;
            var answerMax = ((_document$querySelect4 = document.querySelector('input[name="year-min-1"]')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.value) || maxYearDefault;
            answer = "\u041D\u0435 \u0440\u0430\u043D\u0456\u0448\u0435: ".concat(answerMin, ", \u043D\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435: ").concat(answerMax);
            break;
          }
        case "checkbox":
          {
            console.log("Збереження почалося");
            var selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(function (checkbox) {
              return checkbox.value;
            });
            if (selectedGenres.length === 0) {
              answer = element.answers.split(", ").map(function (e) {
                return e[0].toUpperCase() + e.slice(1);
              }).join(", ");
            } else {
              answer = selectedGenres.join(", ");
            }
            break;
          }
      }
      var newUserAnswer = {
        question: question,
        answer: answer
      };
      result.push(newUserAnswer);
    });
    console.log(result);
    getMovieRecommendations(sandbox = false);
  }
  var errorInputMin = document.querySelector(' p[name="error-year-0"]');
  var errorInputMax = document.querySelector(' p[name="error-year-1"]');
  var yearInputMin = document.querySelector('input[name="year-min-0"]');
  var yearInputMax = document.querySelector('input[name="year-min-1"]');

  // ВАЛІДАЦІЯ
  function validateYears() {
    var yearMin = yearInputMin.value.trim();
    var yearMax = yearInputMax.value.trim();
    var currentYear = new Date().getFullYear();
    var isValid = true;
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
      errorInputMax.textContent = "\u0420\u0456\u043A \u043D\u0435 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435 ".concat(currentYear, " \u0440\u043E\u043A\u0443");
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
  var minSlider = document.querySelector("#lower-slider");
  var maxSlider = document.querySelector("#upper-slider");
  var minGap = 1;
  minSlider.addEventListener("input", function () {
    if (parseInt(minSlider.value) >= parseInt(maxSlider.value) - minGap) {
      minSlider.value = parseInt(maxSlider.value) - minGap;
    }
  });
  maxSlider.addEventListener("input", function () {
    if (parseInt(maxSlider.value) <= parseInt(minSlider.value) + minGap) {
      maxSlider.value = parseInt(minSlider.value) + minGap;
    }
  });
  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Зупинити відправку форми за замовчуванням

    if (validateYears()) {
      sendResults(shortQuestions);

      // Зберігаємо токен аутентифікації перед очищенням localStorage
      var authToken = localStorage.getItem('token');
      localStorage.clear();

      // Відновлюємо токен аутентифікації
      if (authToken) {
        localStorage.setItem('token', authToken);
      }
      showQuestion(shortQuestions);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map
const users = {}; // Збережені користувачі
const loginForm = document.querySelector("#login-form");
const registrationForm = document.querySelector("#registration-form");
const menuBtn = document.querySelector(".menu-item-login");
// ----------- відкриття/закриття модального вікна -----------
const wrapper = document.querySelector(".registration-login-wrapper");
const closeLoginIcon = document.querySelector(".close-login-btn");
const closeRegisterBtn = document.querySelector('.close-register-btn');
wrapper.style.display = "none";

menuBtn.addEventListener("click", (e) => {
  wrapper.style.display = "block";
  document.body.style.overflow = "hidden";
});
closeLoginIcon.addEventListener("click", (e) => {
  wrapper.style.display = "none";
});
closeRegisterBtn.addEventListener("click", (e) => {
  wrapper.style.display = "none";
});

// ======================= ВХІД ====================================

const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginSubmitButton = document.querySelector("#submit-login-btn");

const loginErrorMsg = document.querySelector(".login-error-input-msg");
// const errorInput = document.querySelector(".error-input");
const userNotExistError = document.querySelector(".login-email-error");
const wrongPassword = document.querySelector(".login-password-error");
// const confirmPasswordError = document.querySelector(".confirm-password-error");

registrationForm.style.display = "none";

function loginUser(email, password) {
  // Знайти користувача з введеним email
  const user = Object.values(users).find((user) => user.email === email);

  if (!user) {
    // Якщо користувача з таким email не існує
    userNotExistError.style.display = "block";
    userNotExistError.textContent = "Користувача з таким email не існує";

    registrationForm.style.display = "block";
    loginForm.style.display = "none";
    return false;
  }

  if (user.password !== password) {
    // Якщо пароль неправильний
    wrongPassword.style.display = "block";
    wrongPassword.textContent = "Невірний пароль";
    return false;
  }

  // Успішний вхід
  userNotExistError.style.display = "none";
  wrongPassword.style.display = "none";
  window.location.href = "index.html";
  return true;
}

// Обробка події для форми входу
loginSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  if (emailValue === "" || passwordValue === "") {
    loginErrorMsg.style.display = "block";
    loginErrorMsg.textContent = "Всі поля мають бути заповнені";
    return;
  }

  loginUser(emailValue, passwordValue);
});

// ================= РЕЄСТРАЦІЯ ===================
const form = document.querySelector(".registration-form");

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const username = document.querySelector("#name");
const submitButton = document.querySelector("#submit-registration-btn");

const errorMsg = document.querySelector(".error-input-msg");
const errorInput = document.querySelector(".error-input");
// const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");

function User(email, password, username) {
  this.email = email;
  this.password = password;
  this.username = username;
}

function createId(users) {
  return Object.keys(users).length;
}

// Валідація пошти
function validateEmail(emailValue) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Шаблон для перевірки формату email
  return emailPattern.test(emailValue);
}
// Валідація пароля
function validatePassword(password) {
  const passwordPattern =
    /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[!@#$%^&*'"])[A-Za-zА-Яа-я0-9!@#$%^&*]{8,}$/;
  return passwordPattern.test(password);
}
// перевірка чи співпадають паролі
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Валідація під час введення пароля
password.addEventListener("input", (event) => {
  const passwordValue = event.target.value;
  if (!validatePassword(passwordValue.trim())) {
    passwordError.style.display = "block";
    passwordError.textContent =
      "Пароль повинен містити щонайменше 8 символів, включаючи хоча б одну велику та малу літеру, одну цифру та один спеціальний символ";
  } else {
    passwordError.style.display = "none";
  }
});

// Перевірка на співпадіння паролів під час введення підтвердження пароля
confirmPassword.addEventListener("input", (event) => {
  if (!passwordsMatch(password.value.trim(), confirmPassword.value.trim())) {
    confirmPasswordError.style.display = "block";
    confirmPasswordError.textContent = "Passwords do not match";
  } else {
    confirmPasswordError.style.display = "none";
  }
});

// Подія на кнопку
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const nameValue = username.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  // Перевірка заповнення полів
  if (emailValue === "" || passwordValue === "") {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Заповніть всі обов'язкові поля";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  // Перевірка формату email
  if (!validateEmail(emailValue)) {
    errorInput.style.display = "block";
    errorInput.textContent = "Вкажіть правильну елекронну пошту";
    return;
  } else {
    errorInput.style.display = "none";
  }
  if (Object.values(users).find((user) => user.email === emailValue)) {
    errorInput.style.display = "block";
    errorInput.textContent = "Користувач з таким email вже існує!";
    return;
  }
  // Перевірка чи пароль відповідає вимогам
  if (
    !validatePassword(passwordValue) ||
    !passwordsMatch(passwordValue, confirmPasswordValue)
  ) {
    return;
  }

  console.log("passwordsMatch():", passwordsMatch());
  const user = new User(emailValue, passwordValue, nameValue);
  const userId = "user" + createId(users);
  users[userId] = user;

  console.log(users); //! Виведення зареєстрованого об'єкта користувачів у консоль
  window.location.href = "index.html";
});

// ------------------- показати/сховати пароль ------------------

const loginTogglePasswordButton = document.querySelector(
  ".login-password-field-btn"
);
const registerTogglePasswordButton = document.querySelector(
  "#toggle-password-register"
);
const confirmRegisterPasswordButton = document.querySelector(
  "#toggle-password-confirm-register"
);
loginTogglePasswordButton.addEventListener("click", () => {
  const isPasswordHidden = loginPassword.type === "password";
  loginPassword.type = isPasswordHidden ? "text" : "password";
  loginTogglePasswordButton.textContent = isPasswordHidden ? "🙈" : "👁";
});
registerTogglePasswordButton.addEventListener("click", () => {
  const isPasswordHidden = password.type === "password";
  password.type = isPasswordHidden ? "text" : "password";
  registerTogglePasswordButton.textContent = isPasswordHidden ? "🙈" : "👁";
});
confirmRegisterPasswordButton.addEventListener("click", () => {
  const isPasswordHidden = confirmPassword.type === "password";
  confirmPassword.type = isPasswordHidden ? "text" : "password";
  confirmRegisterPasswordButton.textContent = isPasswordHidden ? "🙈" : "👁";
});

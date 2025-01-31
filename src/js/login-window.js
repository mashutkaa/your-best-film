console.log(";dclskfnjnvfjgn");

let isUserAuthenticated = false;

const loginForm = document.querySelector("#login-form");
const registrationForm = document.querySelector("#registration-form");
const menuBtn = document.querySelector(".menu-item-login a");
const successfulRegistrationWindow = document.querySelector(
  ".successful-registration"
);
successfulRegistrationWindow.style.display = "none";
// ----------- відкриття/закриття модального вікна -----------
const wrapper = document.querySelector(".registration-login-wrapper");
const backgroung = document.querySelector(".main-page-wrapper");
const closeLoginIcon = document.querySelector(".close-login-btn");
const closeRegisterBtn = document.querySelector(".close-register-btn");
const closesuccessfulRegistrationWindow = document.querySelector(
  ".close-succesfull-window"
);
wrapper.style.display = "none";

menuBtn.addEventListener("click", (e) => {
  wrapper.style.display = "block";
  backgroung.classList.add("you");
  document.body.style.overflow = "hidden";
  document.querySelector(".header").style.pointerEvents = "none";
});
closeLoginIcon.addEventListener("click", (e) => {
  wrapper.style.display = "none";
  backgroung.classList.remove("you");
  document.body.style.overflow = "auto";
  document.querySelector(".header").style.pointerEvents = "auto";
});
closeRegisterBtn.addEventListener("click", (e) => {
  wrapper.style.display = "none";
  backgroung.classList.remove("you");
  document.body.style.overflow = "auto";
  document.querySelector(".header").style.pointerEvents = "auto";
});
closesuccessfulRegistrationWindow.addEventListener("click", () => {
  successfulRegistrationWindow.style.display = "none";
});

// ======================= ВХІД ====================================

const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginPasswordWrapper = document.querySelector(".login-password-field");
const loginSubmitButton = document.querySelector("#submit-login-btn");

const loginErrorMsg = document.querySelector(".login-error-input-msg");
// const errorInput = document.querySelector(".error-input");
const userNotExistError = document.querySelector(".login-email-error");
const wrongPassword = document.querySelector(".login-password-error");
// const confirmPasswordError = document.querySelector(".confirm-password-error");

registrationForm.style.display = "none";

function loginUser(email, password) {
  const requestBody = { email, password };

  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          error.status = response.status;
          throw error;
        });
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      userNotExistError.style.display = "none";
      wrongPassword.style.display = "none";
      window.location.href = "index.html";
    })
    .catch((error) => {
      if (error.status === 404) {
        // Користувача з таким email не існує
        userNotExistError.style.display = "block";
        userNotExistError.textContent = "Користувача з таким email не існує";
        registrationForm.style.display = "block";
        loginForm.style.display = "none";
      } else if (error.status === 401) {
        // Неправильний пароль
        wrongPassword.style.display = "block";
        wrongPassword.textContent = "Невірний пароль";
      } else {
        // Тут ще має бути обробка загальної помилки, наприклад коли сервер недоступний
      }

      return false;
    });

  return true;
}

// Обробка події для форми входу
loginSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  if (emailValue === "" || passwordValue === "") {
    loginErrorMsg.style.display = "block";
    loginEmail.style.borderColor = "red";
    loginPasswordWrapper.style.borderColor = "red";
    loginErrorMsg.textContent = "Всі поля мають бути заповнені";
    return;
  }

  loginUser(emailValue, passwordValue);
});

// ================= РЕЄСТРАЦІЯ ===================
const form = document.querySelector(".registration-form");

const email = document.querySelector("#email");

const password = document.querySelector("#password");
const passwordWrapper = document.querySelector("#password-wrapper");
const confirmPassword = document.querySelector("#confirm-password");
const submitPrivacyPolicy = document.querySelector("#submit");
console.log(submitPrivacyPolicy);

const personalAccount = document.querySelector(".menu-item-personal-account");
const personalAccountNav = document.querySelector(
  ".menu-item-personal-account button .username"
);
const confirmPasswordWrapper = document.querySelector(
  "#confirm-password-wrapper"
);
const username = document.querySelector("#name");
const submitButton = document.querySelector("#submit-registration-btn");

const errorMsg = document.querySelector(".error-input-msg");
const errorInput = document.querySelector(".error-input");
const errorName = document.querySelector(".error-name-input");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");

//для підтвердження акаунту
const verifyModalWindow = document.getElementById("verification-modal");
const closeBtn = document.querySelector(".close-verify-btn");
const resendBtn = document.getElementById("resend-btn");
const timerDisplay = document.getElementById("timer");

console.log(personalAccountNav);
verifyModalWindow.style.display = "none";

// Валідація пошти
function validateEmail(emailValue) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Шаблон для перевірки формату email
  return emailPattern.test(emailValue);
}
// Валідація пароля
function validatePassword(password) {
  const conditions = {
    minLength: password.length >= 8,
    lowercase: /[a-zа-я]/.test(password),
    uppercase: /[A-ZА-Я]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*'"]/g.test(password),
  };

  return conditions;
}

function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Валідація під час введення пароля
password.addEventListener("input", (event) => {
  const passwordValue = event.target.value;
  const passwordConditions = validatePassword(passwordValue.trim());

  passwordError.style.display = "block";
  passwordError.innerHTML = "";

  let errorMessages = [];

  if (!passwordConditions.minLength) {
    errorMessages.push("мінімум 8 символів");
  }
  if (!passwordConditions.lowercase) {
    errorMessages.push("хоча б одну малу літеру");
  }
  if (!passwordConditions.uppercase) {
    errorMessages.push("хоча б одну велику літеру");
  }
  if (!passwordConditions.number) {
    errorMessages.push("хоча б одну цифру");
  }
  if (!passwordConditions.specialChar) {
    errorMessages.push("хоча б один спеціальний символ");
  }

  if (errorMessages.length > 0) {
    passwordError.innerHTML = `Пароль повинен містити: ${errorMessages.join(
      ", "
    )}.`;
  }

  if (errorMessages.length === 0) {
    passwordError.style.display = "none";
  }
});

// Перевірка на співпадіння паролів під час введення підтвердження пароля
confirmPassword.addEventListener("input", (event) => {
  if (!passwordsMatch(password.value.trim(), confirmPassword.value.trim())) {
    confirmPasswordError.style.display = "block";
    confirmPasswordWrapper.style.borderColor = "red";
    password.style.borderColor = "red";
    confirmPasswordError.textContent = "Паролі не співпадають";
  } else {
    confirmPasswordError.style.display = "none";
    confirmPasswordWrapper.style.borderColor = "white";
    password.style.borderColor = "white";
  }
});

let timeLeft = 60; // Початковий таймер на 60 секунд

function startTimer() {
  resendBtn.disabled = true;
  let interval = setInterval(() => {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      resendBtn.disabled = false;
      timerDisplay.textContent = "";
    }
  }, 1000);
}
// Подія на кнопку
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const nameValue = username.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const emailLength = emailValue.split("@")[0].length;
  // Перевірка заповнення полів
  if (!emailValue || !passwordValue || !submitPrivacyPolicy.checked) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Заповніть всі обов'язкові поля";
    return;
  }

  // Перевірка формату email
  if (!validateEmail(emailValue)) {
    errorInput.style.display = "block";
    email.style.borderColor = "red";
    errorInput.textContent = "Вкажіть правильну елекронну пошту";
    return;
  } else {
    errorInput.style.display = "none";
  }
  // Перевірка чи пароль відповідає вимогам
  if (
    !validatePassword(passwordValue) ||
    !passwordsMatch(passwordValue, confirmPasswordValue)
  ) {
    return;
  }

  if (emailLength <= nameValue.length) {
    errorName.innerHTML = `Ім'я повинно бути не довшим за ${emailLength} символів`;
    return;
  }
  const requestBody = {
    email: emailValue,
    password: passwordValue,
    username: nameValue,
  };

  // verifyModalWindow.style.display = 'block';

  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          error.status = response.status;
          throw error;
        });
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      wrapper.style.display = "none";
      successfulRegistrationWindow.style.display = "block";
      if (nameValue !== "") {
        menuBtn.textContent = nameValue;
      } else {
        menuBtn.textContent = emailValue;
      }
      console.log("Реєстрація успішна, показуємо вікно");

      verifyModalWindow.style.display = "block";
      startTimer();
      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });
      // Повторне надсилання листа
      resendBtn.addEventListener("click", function () {
        timeLeft = 60;
        startTimer();
        alert("Лист повторно надіслано!");
      });

      setTimeout(() => {
        successfulRegistrationWindow.style.display = "none";
      }, 15000);
    })
    .catch((error) => {
      if (error.status === 400) {
        errorInput.style.display = "block";
        email.style.borderColor = "red";
        errorInput.textContent = "Користувач з таким email вже існує!";
      } else {
        // Тут ще має бути обробка загальної помилки, наприклад коли сервер недоступний
      }
    });
});
// успішна реєстрація

// ------------------- показати/сховати пароль ------------------

const loginTogglePasswordButton = document.querySelector(
  ".login-password-field-btn"
);
const registerTogglePasswordButton = document.querySelector(
  "#toggle-password-register"
);
const registerToggleNewPasswordButton = document.querySelector(
  "#toggle-new-password-register"
);
const confirmRegisterPasswordButton = document.querySelector(
  "#toggle-password-confirm-register"
);
const confirmRegisterNewPasswordButton = document.querySelector(
  "#toggle-new-password-confirm-register"
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
registerToggleNewPasswordButton.addEventListener("click", () => {
  const isPasswordHidden = newPassword.type === "password";
  newPassword.type = isPasswordHidden ? "text" : "password";
  registerToggleNewPasswordButton.textContent = isPasswordHidden ? "🙈" : "👁";
});
confirmRegisterPasswordButton.addEventListener("click", () => {
  const isPasswordHidden = confirmPassword.type === "password";
  confirmPassword.type = isPasswordHidden ? "text" : "password";
  confirmRegisterPasswordButton.textContent = isPasswordHidden ? "🙈" : "👁";
});
confirmRegisterNewPasswordButton.addEventListener("click", () => {
  const isPasswordHidden = newConfirmPassword.type === "password";
  newConfirmPassword.type = isPasswordHidden ? "text" : "password";
  confirmRegisterNewPasswordButton.textContent = isPasswordHidden ? "🙈" : "👁";
});

// ======================= ВІДНОВЛЕННЯ СЕСІЇ ЯКЩО КОРИСТУВАЧ ВЖЕ УВІЙШОВ =======================
const token = localStorage.getItem("token");

if (token) {
  fetch("http://localhost:3000/auth/verifyToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Token verification failed");
      }
      return response.json();
    })
    .then((data) => {
      functionsForAuthUsers(data);
    })
    .catch((error) => {
      console.error(error);
      // Видалити недійсний токен з localStorage
      localStorage.removeItem("token");
    });
}

function functionsForAuthUsers(data) {
  isUserAuthenticated = true;

  menuBtn.style.display = "none";
  wrapper.style.display = "none";
  personalAccount.style.display = "inline-block";

  if (personalAccountNav !== null) {
    if (data.username !== "") {
      personalAccountNav.textContent = data.username;
    } else {
      personalAccountNav.textContent = data.email.slice(0, -10);
    }
  }
}

function logOut() {
  isUserAuthenticated = false;

  personalAccount.style.display = "none";
  menuBtn.style.display = "block";

  console.log("Вихід успішний");
  localStorage.removeItem("token");
}

// ---------------- Забули пороль ----------------
const forgotPasswordBtn = document.querySelector(".forgot-password");
const forgotPasswordWindow = document.querySelector(
  ".forgot-password-window-wrapper"
);

const recoveryMessageWindow = document.querySelector(
  ".recovery-message-wrapper"
);
const newPasswordWindow = document.querySelector(".new-password-wrapper"); //! вікно для введення нового пароля
const successfulRecoveryWindow = document.querySelector(".successful-recovery");

const recoveryMessageBtn = document.querySelector(".recovery-message-btn");
const recoveryMessageEmail = document.querySelector(
  ".recovery-message-text span"
);
const saveNewPasswordBtn = document.querySelector(".save-new-password-btn");
const closeForgotPasswordBtn = document.querySelector(
  ".close-forgot-password-window"
);
const closeRecoveryMessageBtn = document.querySelector(
  ".close-recovery-message"
);
const closeNewPasswordWindowBtn = document.querySelector(
  ".close-new-pasword-window"
);
const closeSuccessfulRecoverBtn = document.querySelector(
  ".close-successful-recover"
);
const recoveryEmail = document.querySelector("#recovery-email");
const newPassword = document.querySelector("#new-password");
const newPasswordWrapper = document.querySelector("#new-password-wrapper");
const newConfirmPassword = document.querySelector("#new-confirm-password");
// const confirmNewPassword = document.querySelector("#confirm-password");
const confirmNewPasswordError = document.querySelector(
  ".confirm-new-password-error"
);
const newErrorMsg = document.querySelector(".new-error-input-msg");
const newPasswordError = document.querySelector(".new-password-error");

const recoveryEmailValue = recoveryEmail.value.trim();

forgotPasswordWindow.style.display = "none";
recoveryMessageWindow.style.display = "none";
newPasswordWindow.style.display = "none";
successfulRecoveryWindow.style.display = "none";

forgotPasswordBtn.addEventListener("click", () => {
  forgotPasswordWindow.style.display = "block";
  wrapper.style.display = "none";
});
closeForgotPasswordBtn.addEventListener("click", () => {
  forgotPasswordWindow.style.display = "none";
  wrapper.style.display = "block";
});
recoveryMessageBtn.addEventListener("click", (e) => {
  recoveryMessageWindow.style.display = "block";
  forgotPasswordWindow.style.display = "none";
  recoveryMessageEmail.style.textContent.innerHTML = `${recoveryEmailValue}`;
});
closeRecoveryMessageBtn.addEventListener("click", () => {
  recoveryMessageWindow.style.display = "none";
  wrapper.style.display = "block";
});
closeNewPasswordWindowBtn.addEventListener("click", () => {
  newPasswordWindow.style.display = "none";
  wrapper.style.display = "block";
  backgroung.classList.add("you");
  document.body.style.overflow = "hidden";
  document.querySelector(".header").style.pointerEvents = "none";
});
saveNewPasswordBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Запобігає перезавантаженню сторінки

  const newPasswordValue = newPassword.value.trim();
  const newConfirmPasswordValue = newConfirmPassword.value.trim();

  newErrorMsg.style.display = "none";
  newErrorMsg.textContent = "";

  // Перевірка заповнення полів
  if (!newPasswordValue || !newConfirmPasswordValue) {
    newErrorMsg.style.display = "block";
    newErrorMsg.textContent = "Заповніть всі обов'язкові поля";
    return;
  }

  // Перевірка відповідності паролів
  if (!passwordsMatch(newPasswordValue, newConfirmPasswordValue)) {
    confirmNewPasswordError.style.display = "block";
    confirmNewPasswordError.textContent = "Паролі не співпадають";
    return;
  }

  // Перевірка чи пароль відповідає вимогам
  if (!validatePassword(newPasswordValue).minLength) {
    newPasswordError.style.display = "block";
    newPasswordError.textContent = "Пароль має бути мінімум 8 символів";
    return;
  }

  // Якщо всі перевірки пройдено - виконуємо успішний сценарій
  successfulRecoveryWindow.style.display = "block";
  newPasswordWindow.style.display = "none";
  backgroung.classList.add("you");
  document.body.style.overflow = "hidden";
  document.querySelector(".header").style.pointerEvents = "none";
});
closeSuccessfulRecoverBtn.addEventListener("click", () => {
  successfulRecoveryWindow.style.display = "none";
  backgroung.classList.remove("you");
  document.body.style.overflow = "auto";
  document.querySelector(".header").style.pointerEvents = "auto";
});

// чи співпадають паролі

newConfirmPassword.addEventListener("input", () => {
  if (
    !passwordsMatch(newPassword.value.trim(), newConfirmPassword.value.trim())
  ) {
    confirmNewPasswordError.style.display = "block";
    newConfirmPassword.style.borderColor = "red";
    newPassword.style.borderColor = "red";
    confirmNewPasswordError.textContent = "Паролі не співпадають";
  } else {
    confirmNewPasswordError.style.display = "none";
    newConfirmPassword.style.borderColor = "white";
    newPassword.style.borderColor = "white";
  }
});

// Валідація під час введення пароля
newPassword.addEventListener("input", (event) => {
  const newPasswordValue = event.target.value;
  const newPasswordConditions = validatePassword(newPasswordValue.trim());

  newPasswordError.style.display = "block";
  newPasswordError.innerHTML = "";

  let errorMessages = [];

  if (!newPasswordConditions.minLength) {
    errorMessages.push("мінімум 8 символів");
  }
  if (!newPasswordConditions.lowercase) {
    errorMessages.push("хоча б одну малу літеру");
  }
  if (!newPasswordConditions.uppercase) {
    errorMessages.push("хоча б одну велику літеру");
  }
  if (!newPasswordConditions.number) {
    errorMessages.push("хоча б одну цифру");
  }
  if (!newPasswordConditions.specialChar) {
    errorMessages.push("хоча б один спеціальний символ");
  }

  if (errorMessages.length > 0) {
    newPasswordError.innerHTML = `Пароль повинен містити: ${errorMessages.join(
      ", "
    )}.`;
  }

  if (errorMessages.length === 0) {
    newPasswordError.style.display = "none";
  }
});

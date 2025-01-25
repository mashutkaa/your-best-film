const loginForm = document.querySelector("#login-form");
const registrationForm = document.querySelector("#registration-form");
const menuBtn = document.querySelector(".menu-item-login");
// ----------- відкриття/закриття модального вікна -----------
const wrapper = document.querySelector(".registration-login-wrapper");
const closeLoginIcon = document.querySelector(".close-login-btn");
const closeRegisterBtn = document.querySelector(".close-register-btn");
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
      if (error.status === 404) { // Користувача з таким email не існує
        userNotExistError.style.display = "block";
        userNotExistError.textContent = "Користувача з таким email не існує";
        registrationForm.style.display = "block";
        loginForm.style.display = "none";
      } else if (error.status === 401) { // Неправильний пароль
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
const personalAccountNav = document.querySelector(
  ".menu-item-personal-account a"
);
const confirmPasswordWrapper = document.querySelector(
  "#confirm-password-wrapper"
);
const username = document.querySelector("#name");
const submitButton = document.querySelector("#submit-registration-btn");

const errorMsg = document.querySelector(".error-input-msg");
const errorInput = document.querySelector(".error-input");
// const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");

console.log(personalAccountNav);

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
    confirmPasswordWrapper.style.borderColor = "red";
    password.style.borderColor = "red";
    confirmPasswordError.textContent = "Паролі не співпадають";
  } else {
    confirmPasswordError.style.display = "none";
    confirmPasswordWrapper.style.borderColor = "white";
    password.style.borderColor = "white";
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

  const requestBody = { email: emailValue, password: passwordValue, username: nameValue };

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
        }
        );
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);

      menuBtn.style.display = "none";
      wrapper.style.display = "none";

      if (nameValue !== "") {
        personalAccountNav.textContent = nameValue;
      } else {
        personalAccountNav.textContent = emailValue;
      }

      window.location.href = "index.html";
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


// ======================= ВІДНОВЛЕННЯ СЕСІЇ ЯКЩО КОРИСТУВАЧ ВЖЕ УВІЙШОВ =======================
const token = localStorage.getItem("token");

if (token) {
  fetch("http://localhost:3000/auth/verifyToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Token verification failed");
      }
      return response.json();
    })
    .then((data) => {
      menuBtn.style.display = "none";
      wrapper.style.display = "none";

      if (personalAccountNav !== null) {
        if (data.username !== "") {
          personalAccountNav.textContent = data.username;
        } else {
          personalAccountNav.textContent = data.email;
        }
      }
    })
    .catch((error) => {
      console.error(error);
      // Видалити недійсний токен з localStorage
      localStorage.removeItem("token");
    });
}


console.log("helloлл");

// dsfvdvgfdbgfb
const nameInput = document.querySelector("#setting-name");
const oldPasswordInput = document.querySelector("#setting-old-password");
const newPasswordInput = document.querySelector("#setting-new-password");
const confirmBtn = document.querySelector(".confirm-changes-bth");

document.querySelector(".settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

confirmBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const newUsername = nameInput.value.trim();
  const oldPassword = oldPasswordInput.value;
  const newPassword = newPasswordInput.value;

  if (!newUsername && !oldPassword && !newPassword) {
    alert("Будь ласка, введи нове ім’я або зміну пароля.");
    return;
  }

  try {
    // 🔄 Зміна імені
    if (newUsername) {
      const res = await fetch("http://localhost:3000/user/change-username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Ім’я успішно оновлено!");
        nameInput.value = "";
      } else {
        alert(`Помилка при зміні імені: ${data.error}`);
      }
    }

    // 🔄 Зміна пароля
    if (oldPassword && newPassword) {
      const res = await fetch("http://localhost:3000/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Пароль успішно змінено!");
        oldPasswordInput.value = "";
        newPasswordInput.value = "";
      } else if (res.status === 401) {
        alert("Неправильний старий пароль.");
      } else {
        alert(`Помилка при зміні пароля: ${data.error}`);
      }
    } else if (oldPassword || newPassword) {
      alert("Щоб змінити пароль, заповни обидва поля: старий і новий пароль.");
    }
  } catch (err) {
    alert("Сталася помилка з'єднання з сервером.");
    console.error(err);
  }
});

const deleteBtn = document.querySelector(".delete-acc-btn");

deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const confirmDelete = confirm("Ти впевнена, що хочеш видалити акаунт?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/user/delete-account", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      window.location.href = "/src/index.html";
      localStorage.removeItem("token");
      alert("Акаунт видалено.");
    } else {
      const data = await res.json();
      alert(`Помилка: ${data.message}`);
    }
  } catch (err) {
    alert("Помилка з'єднання з сервером.");
  }
});

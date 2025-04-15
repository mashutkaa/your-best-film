import bcrypt from "bcrypt";
import {
  getUserById,
  updateUserField,
  deleteUserById,
} from "../models/user.js";
import { sendEmail } from "../services/emailService.js";

// Функція для перевірки наявності користувача
async function checkUserExistence(userId) {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// Функція для зміни пароля
export async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await checkUserExistence(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserField(userId, "password", hashedPassword);

    await sendEmail(
      user.email,
      "Пароль змінено",
      `
      
            Ваш пароль успішно змінено
        Якщо ви не здійснювали цієї зміни, будь ласка, зв'яжіться з нами.
        
      `
    );

    res.json({ message: "Password successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message || "Server error" });
  }
}

// Функція для зміни імені
export async function changeUsername(req, res) {
  const { newUsername } = req.body;
  const userId = req.user.userId;

  try {
    const user = await checkUserExistence(userId);

    await updateUserField(userId, "username", newUsername);

    res.json({ message: "Username successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message || "Server error" });
  }
}

// Функція для видалення акаунту
export async function deleteAccount(req, res) {
  const userId = req.user.userId;

  try {
    const user = await checkUserExistence(userId);

    await deleteUserById(userId);

    await sendEmail(
      user.email,
      "Акаунт видалено",
      `
        
            Ваш акаунт був успішно видалений.
            Якщо ви не ініціювали видалення, будь ласка, зверніться до нас.
        
      `
    );

    res.json({ message: "Account successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message || "Server error" });
  }
}

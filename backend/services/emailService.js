import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "backend/.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Відправляє електронного листа на вказану адресу
 * @param {string} to - Email отримувача
 * @param {string} subject - Тема листа
 * @param {string} text - Текст листа
 * @param {boolean} useHtml - Чи використовувати HTML у листі
 */
const sendEmail = async (to, subject, text, useHtml = false) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: useHtml ? text : undefined
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

export { sendEmail };
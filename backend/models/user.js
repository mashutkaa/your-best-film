import db from "../config/db.js";

/**
 * Створює користувача в базі даних
 * @param {string} email - електронна пошта користувача
 * @param {string} password - пароль користувача
 * @param {string} username - ім'я користувача
 * @returns {Promise<number>} - ідентифікатор користувача
 */
export async function createUser(email, password, username) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`,
            [email, username, password],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

/**
 * Отримує користувача за електронною поштою
 * @param {string} email - електронна пошта користувача
 * @returns {Promise<object>} - Об'єкт користувача
 */
export async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

/**
 * Отримує користувача за ідентифікатором (id)
 * @param {number} id - ідентифікатор користувача
 * @returns {Promise<object>} - Об'єкт користувача
 */
export async function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE id = ?`,
            [id],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}


/**
 * Оновлює статус підтвердження електронної пошти користувача в базі даних
 * @param {number} userId - ідентифікатор користувача
 * @param {number} status - статус підтвердження (0 або 1)
 * @returns {Promise<boolean>} - успішність оновлення
 */
export async function updateEmailStatus(userId, status) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE users SET email_verified = ? WHERE id = ?`,
            [status, userId],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes > 0);
                }
            }
        );
    });
}
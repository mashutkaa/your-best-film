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
 * Оновлює значення поля у користувача
 * @param {number} id - ідентифікатор користувача
 * @param {string} field - поле, яке треба оновити
 * @param {string} value - нове значення поля
 * @returns {Promise<void>}
 */
export async function updateUserField(id, field, value) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE users SET ${field} = ? WHERE id = ?`,
            [value, id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

/**
 * Видаляє користувача за ідентифікатором (id)
 * @param {number} id - ідентифікатор користувача
 * @returns {Promise<void>}
 */
export async function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM users WHERE id = ?`,
            [id],
            (err) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(); 
                }
            }
        );
    });
}
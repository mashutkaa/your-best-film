import db from "../config/db.js";

export async function createUser(email, username, password) {
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
import db from "../config/db.js";

export const addFilmToCollection = (req, res) => {
    const {
        collection_id,
        name,
        rating,
        genre,
        year,
        description,
        img_url,
        is_saved,
    } = req.body; // приймаємо всю інформацію про фільм

    const user_id = req.user.userId;

    // Перевірка, чи існує колекція, що належить користувачу
    db.get(
        `SELECT * FROM collections WHERE id = ? AND user_id = ?`,
        [collection_id, user_id],
        (err, row) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ error: "Error checking collection ownership" });
            }
            if (!row) {
                return res.status(403).json({
                    error: "You do not have permission to access this collection",
                });
            }
            // Додаємо фільм до колекції
            db.run(
                `INSERT INTO collection_films (collection_id, user_id, name, rating, genre, year, description, img_url, is_saved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    collection_id,
                    user_id,
                    name,
                    rating,
                    genre,
                    year,
                    description,
                    img_url,
                    is_saved,
                ],
                function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Error adding film to collection_films",
                        });
                    }

                    res.status(201).json({
                        collection_id,
                        user_id,
                        name,
                        rating,
                        genre,
                        year,
                        description,
                        img_url,
                        is_saved,
                    });
                }
            );
        }
    );
};

export const getFilmsByCollection = (req, res) => {
    const { collection_id } = req.params; // Отримуємо collection_id з параметрів

    // Витягуємо фільми з колекції за collection_id
    db.all(
        "SELECT * FROM collection_films WHERE collection_id = ?",
        [collection_id],
        (err, films) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(films);
        }
    );
};

export const updateFilmStatus = (req, res) => {
    const { collection_id, film_id, is_saved } = req.body; // Приймаємо id колекції, фільму і новий статус

    const userId = req.user.userId;

    // Перевірка, чи існує колекція, що належить користувачу
    db.get(
        `SELECT * FROM collections WHERE id = ? AND user_id = ?`,
        [collection_id, userId],
        (err, row) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ error: "Error checking collection ownership" });
            }
            if (!row) {
                return res.status(403).json({
                    error: "You do not have permission to access this collection",
                });
            }

            // Оновлення статусу фільму в колекції
            db.run(
                `UPDATE collection_films SET is_saved = ? WHERE collection_id = ? AND film_id = ?`,
                [is_saved, collection_id, film_id],
                function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Error updating film status",
                        });
                    }

                    res.status(200).json({
                        message: "Film status updated successfully",
                        collection_id,
                        film_id,
                        is_saved,
                    });
                }
            );
        }
    );
};

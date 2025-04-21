import db from "../config/db.js";

// Створення нової колекції
export const createCollection = (req, res) => {
    const { name, meta_data } = req.body;
    const userId = req.user.userId; // отримуємо ID користувача з мідлвару

    console.log("createCollection: req.body:", req.body);
    console.log("createCollection: userId:", userId);

    db.run(
        `INSERT INTO collections (collection_name, meta_data, user_id) VALUES (?, ?, ?)`,
        [name, meta_data, userId], // передаємо ID користувача
        function (err) {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ error: "Error creating collection" });
            }
            res.status(201).json({
                id: this.lastID,
                name,
                meta_data,
                user_id: userId,
            });
        },
    );
};

// Отримання всіх колекцій користувача
export const getAllCollections = (req, res) => {
    const userId = req.user.userId; // отримуємо ID користувача з мідлвару

    db.all(
        `SELECT * FROM collections WHERE user_id = ?`, // фільтруємо по user_id
        [userId], // передаємо ID користувача
        (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ error: "Error fetching collections" });
            }
            res.status(200).json(rows);
        },
    );
};

// Отримання колекції за ID
export const getCollectionById = (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // отримуємо ID користувача з мідлвару

    db.get(
        `SELECT * FROM collections WHERE id = ? AND user_id = ?`, // фільтруємо по ID і user_id
        [id, userId], // передаємо ID користувача та колекції
        (err, row) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ error: "Error fetching collection" });
            }
            if (!row) {
                return res.status(404).json({ error: "Collection not found" });
            }
            res.status(200).json(row);
        },
    );
};

export const deleteCollection = (req, res) => {
    const userId = req.user.userId;
    const collectionId = req.params.id;

    const query = `DELETE FROM collections WHERE id = ? AND user_id = ?`;

    db.run(query, [collectionId, userId], function (err) {
        if (err) {
            console.error("Error deleting collection:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (this.changes === 0) {
            return res
                .status(404)
                .json({ message: "Collection not found or unauthorized" });
        }

        res.status(200).json({ message: "Collection deleted successfully" });
    });
};

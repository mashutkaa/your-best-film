import db from "../config/db.js";

export const getAllFilms = (req, res) => {
    db.all("SELECT * FROM films", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const getFilmById = (req, res) => {
    db.get("SELECT * FROM films WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Film not found" });
        }
        res.json(row);
    });
};

export const createFilm = (req, res) => {
    const { name, rating, genre, year, description, img_url } = req.body;
    const user_id = req.user.id; // Отримуємо user_id з токена

    db.run(
        "INSERT INTO films (name, rating, genre, year, description, img_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, rating, genre, year, description, img_url, user_id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                id: this.lastID,
                name,
                rating,
                genre,
                year,
                description,
                img_url,
                user_id,
            });
        },
    );
};

export const deleteFilm = (req, res) => {
    console.log("Отриманий ID для видалення:", req.params.id);

    db.run("DELETE FROM films WHERE id = ?", [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Film not found" });
        }
        res.json({ message: "Film deleted successfully" });
    });
};

import db from '../config/db.js'

export const getAllFilms = (req, res) => {
    db.all("SELECT * FROM films", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    })
}

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
  // console.log("Received request body:", req.body);
    const { name, rating, genre, year, description, img_url } = req.body;
  
    db.run(
      "INSERT INTO films (name, rating, genre, year, description, img_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name, rating, genre, year, description, img_url],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, rating, genre, year, description, img_url });
      }
    );
};

export const deleteFilm = (req, res) => {
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
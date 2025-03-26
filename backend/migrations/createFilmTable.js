import db from "../config/db.js";

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS films (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        rating REAL,
        genre TEXT,
        year TEXT,
        description TEXT,
        img_url TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
        (err) => {
            if (err) {
                console.error("Error creating films table:", err);
            } else {
                console.log("Films table created successfully.");
            }
        },
    );
});

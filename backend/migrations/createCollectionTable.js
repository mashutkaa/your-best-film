import db from "../config/db.js";

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS collections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          collection_name TEXT NOT NULL,
          meta_data TEXT,
          user_id INTEGER,
          created_at TEXT DEFAULT (datetime('now')),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        (err) => {
            if (err) {
                console.error("Error creating collections table:", err);
            } else {
                console.log("Collections table created successfully.");
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS collection_films (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    collection_id INTEGER NOT NULL,
    user_id INTEGER,
    name TEXT,
    rating REAL,
    genre TEXT,
    year TEXT,
    description TEXT,
    img_url TEXT,
    is_saved INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`,
        (err) => {
            if (err) {
                console.error("Error creating collection_films table:", err);
            } else {
                console.log("Collection_films table created successfully.");
            }
        }
    );
});

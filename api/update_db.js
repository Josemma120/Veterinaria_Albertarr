import { db } from "./config/db.js";

const sql = "ALTER TABLE servicios ADD COLUMN duracion INT DEFAULT NULL";

db.query(sql, (err, result) => {
    if (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column 'duracion' already exists.");
        } else {
            console.error("Error altering table:", err.message);
        }
    } else {
        console.log("Table 'servicios' altered successfully. Added 'duracion'.");
    }
    db.end();
});

// Connect.js file

import sqlite3 from 'sqlite3';


async function initializeDatabase() {
    // Connect to SQLite database, and if it doesn't exist, create it
    const db = new sqlite3.Database(
        "users.db",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            // Error handling for connection
            if (err) {
                return console.error(err.message);
            } else {
                // Success message for successful connection
                console.log("Connected to the SQLite database.");
            }
        }
    );

    // Create a table (if not exists)
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT,
    email TEXT
  )`);

// Define an array of data to be inserted
// const userData = [
//     ['192.168.1.100', 'user1@example.com'],
//     ['192.168.1.101', 'user2@example.com'],
//     ['192.168.1.102', 'user3@example.com'],
//     // Add more rows as needed
//   ];
  
  // Loop through the userData array and insert each row into the users table
//   userData.forEach((data) => {
//     db.run(`INSERT INTO users (ip_address, email) VALUES (?, ?)`, data, function (err) {
//       if (err) {
//         return console.error(err.message);
//       }
//       console.log(`A row has been inserted with rowid ${this.lastID}`);
//     });
//   });

    // Select data from the table
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Closed the SQLite database connection.');
        }
        ;
    })
};

export default initializeDatabase;
// lib/lowDb.js
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json'); // Change the file name if needed
const db = low(adapter);

// Initialize the database with a 'userAnswers' collection
db.defaults({ userAnswers: [] }).write();

// Save user answers to the database
export const saveUserAnswers = (userAnswers) => {
  db.get('userAnswers').push(userAnswers).write();
};

// Get all user answers from the database
export const getAllUserAnswers = () => {
  return db.get('userAnswers').value();
};

// Add more functions as needed based on your application requirements

export default db;

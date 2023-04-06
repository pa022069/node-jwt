require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    port: 5001
  },
  gmail: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD
  },
};
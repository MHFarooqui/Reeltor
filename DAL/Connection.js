const pgp = require('pg-promise')();
const dotenv = require('dotenv');
dotenv.config();

const db = pgp({
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
});

const connectDb = () => {
    db.connect()
      .then(obj => {
        console.log('Connected to the sql database');
        obj.done();
      })
      .catch(error => {
        console.error('Error connecting to the database:', error);
      });
  }

  module.exports = { connectDb, db };


const path = require("path");
require("dotenv").config(path.join(__dirname, "../.env"));

const { DB_USER, DB_PASS } = process.env;

module.exports = {
  database: {
    hots: "localhost",
    user: DB_USER,
    password: DB_PASS,
    database: "database_links",
  },
};

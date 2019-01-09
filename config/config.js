const fs = require('fs');

module.exports = {
  development: {
    username: null,
    password: null,
    database: "jotterdb_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: null,
    password: null,
    database: "jotterdb_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    database: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: true
    }
  }
}
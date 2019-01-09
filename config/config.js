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
    /* username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    dialect: "postgres",
    ssl: true,
    host: process.env.HOST,
    dialectOptions: {
      ssl: true
    } */
    use_env_variable: "DATABASE_URL"
  }
}
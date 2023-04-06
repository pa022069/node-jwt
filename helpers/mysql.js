const mysql = require("mysql");
const conf = require('./config');

const createConnection = () => mysql.createConnection(conf.db);

module.exports = { createConnection }
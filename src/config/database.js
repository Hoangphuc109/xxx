require('dotenv').config();
const mysql = require('mysql2/promise');


// Setup for MySQL
const connection_mysql = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Export both connections
module.exports = connection_mysql

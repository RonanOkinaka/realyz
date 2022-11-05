import * as mysql from 'mysql2';

// Set up the MySQL connection pool as a global variable
const pool = mysql.createPool({
    host    : process.env.MYSQL_DB_HOST,
    user    : process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME
}).promise();

export default pool;

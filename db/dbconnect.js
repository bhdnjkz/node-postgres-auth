const Pool = require('pg').Pool

const pool = new Pool({
    host: '127.0.0.1',
    user: "user",
    port: 5432,
    password: "password",
    database: "dbname"
})

module.exports = pool
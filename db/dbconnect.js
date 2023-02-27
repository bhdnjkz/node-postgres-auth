const Pool = require('pg').Pool

const pool = new Pool({
    host: "host",
    user: "user",
    port: 5432,
    password: "password",
    database: "dbname"
})

module.exports = pool
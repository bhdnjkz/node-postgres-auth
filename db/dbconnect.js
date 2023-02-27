const Pool = require('pg').Pool

const pool = new Pool({
    host: process.env.PG_ENDPOINT,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASS,
    database: process.env.PG_DB
})

module.exports = pool
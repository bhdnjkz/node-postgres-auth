const Pool = require('pg').Pool

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "231445Doss",
    database: "postgres"
})

module.exports = pool
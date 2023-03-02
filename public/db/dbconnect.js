const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: "231445Doss",
    database: 'postgres'
})
//ssh password: aWaewa4reij;ie"


pool.connect((err, client, done) => {
    if (err) throw err
    client.query(`CREATE TABLE IF NOT EXISTS public.countries
    (
        country_name character varying COLLATE pg_catalog."default"
    )`, (err, res) => {
      if (err) {
        console.log(err.stack)
      }
    })
    client.query(`SELECT COUNT (*) FROM countries`, (err, res) =>{
        if (err) throw err
        if (res.rows.length === 0) {
            client.query(`INSERT INTO "countries"("country_name") VALUES ("Ukraine"), ("USA"), ("Finland"), ("Canada")`)
        }
    })
    client.query(`CREATE TABLE IF NOT EXISTS public.users
    (
        email character varying COLLATE pg_catalog."default",
        login character varying COLLATE pg_catalog."default",
        rname character varying COLLATE pg_catalog."default",
        pwd character varying COLLATE pg_catalog."default",
        birthday date,
        country character varying COLLATE pg_catalog."default"
    )`, (err, res) => {
      done()
      if (err) {
        console.log(err.stack)
      }
    })
  })



module.exports = pool
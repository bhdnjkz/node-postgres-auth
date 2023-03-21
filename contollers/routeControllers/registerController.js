const pool = require('../../config/dbConnect')

module.exports = {

    get: (req, res) => {
        pool.query('SELECT * FROM countries ORDER BY "country_name" ASC', (err, country_name) => {
            if (err) {
              console.log(err)
            } 
            res.render('register.ejs', {country_data: country_name.rows, errors: [], formDataHolder: {}})
          })
    },

    post: (req, res) => {
        const { email, login, rname, pwd, pwd2, birthday, country } = req.body
        let errors = []
  
    if ( !email || !login || !rname || !pwd || !birthday || !country ){
      errors.push('Please fill out all the forms')
    }
    if (pwd.length < 6) {
        errors.push('Password needs to be at least 6 characters long')
  }
    if (pwd != pwd2) {
        errors.push('Passwords should match')
  }
    pool.query(`SELECT * FROM users WHERE email = $1`,
    [email], (err, results) => {
       if (results.rows.length) {
        errors.push('This email is already registered')
      } else if (errors === [])
      {
        pool.query(`INSERT INTO "users"("email", "login", "rname", "pwd", "birthday", "country") VALUES ($1, $2, $3, $4, $5, $6)`,
        [email, login, rname, pwd, birthday, country], (err, data) => {
          if (err) {
            console.log(err)
            return
          }
          console.log('User data saved to database:', data.rows);
        })
      } 
    })
      console.log(errors)
      if (errors.length === 0) {
        res.redirect(`/login`)
      } else {
        pool.query('SELECT * FROM countries ORDER BY "country_name" ASC', (err, country_name) => {
          if (err) {
            console.log(err)
          } 
          res.render('register.ejs', {country_data: country_name.rows, errors: errors, formDataHolder: {
            email: email,
            login: login,
            rname: rname,
            birthday: birthday,
            country: country
          }})
        })
      }
    }
}
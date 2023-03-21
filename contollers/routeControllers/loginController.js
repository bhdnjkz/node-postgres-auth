const pool = require('../../config/dbConnect')

module.exports = {
    get: (req, res) => {
        res.render("login.ejs", {errors: []})
    },

    post: (req, res) => {
        const { email, pwd } = req.body
        let errors = []
        
            if (email && pwd) {
              pool.query(`SELECT * FROM users WHERE email = $1 and pwd = $2 `,
              [email, pwd], (err, results) => {
                 if (results.rows.length > 0) {
                  req.session.loggedin = true
                  req.session.rname = results.rows[0].rname
    
                    res.redirect('/dashboard')
                 }
                  else {
                  errors.push('Wrong login or password!')
                  res.render("login.ejs", {errors: errors})
                 }
              })
            }
        }
}
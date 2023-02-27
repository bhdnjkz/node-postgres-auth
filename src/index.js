const express = require('express')
const pool = require('../db/dbconnect')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT || 3000

//middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(express.static('public'))
app.set('view engine', 'ejs')

//routes
app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs", {errors: []})
})

app.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.render("dashboard.ejs", {rname: req.session.rname})
  }
  })

app.get('/register', (req, res) => {
  pool.query('SELECT * FROM countries ORDER BY "country_name" ASC', (err, country_name) => {
    if (err) {
      console.log(err)
    } 
    res.render('register.ejs', {country_data: country_name.rows, errors: [], formDataHolder: {}})
  })
})


//db
//this function allows us to send a filled form to the database.
app.post('/register', (req, res) => {
const { email, login, rname, pwd, pwd2, birthday, country } = req.body
let errors = []
let formDataHolder = {}

//validation
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
        }
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
})

//login form, need to figure out how to allow user to login using his username OR email
app.post('/login', (req, res) => {
const { email, pwd } = req.body
let errors = []

    if (email && pwd) {
      pool.query(`SELECT * FROM users WHERE email = $1 and pwd = $2 `,
      [email, pwd], (err, results) => {
         if (results.rows.length > 0) {
          req.session.loggedin = true
          req.session.rname = results.rows[0].rname
  
            res.redirect('/dashboard')
            console.log(results.rows)
         }
          else {
          errors.push('Wrong login or password!')
          res.render("login.ejs", {errors: errors})
         }
      })
    }
})


function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'world'], ' ');
  return element;
}

document.body.appendChild(component());

app.listen(PORT)
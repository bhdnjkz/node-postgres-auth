const express = require('express')
const pool = require('./config/dbconnect')
const app = express()
const path = require('path')
const session = require('express-session')
const PORT = process.env.PORT
const indexRoute = require('./routes/indexRoute')
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute')
const dashboardRoute = require('./routes/dashboardRoute')
require('dotenv').config()

//middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.set('views', path.join(__dirname, '/public/views'))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static((path.join(__dirname, 'public'))));


//routes
app.use('/', indexRoute)
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/dashboard', dashboardRoute)

app.listen(PORT)
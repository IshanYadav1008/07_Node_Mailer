require('dotenv').config();

const express = require ('express')
const app     = express()

const PORT    = process.env.PORT || 3000
const db      = require('./db') 

// Using Passport Middleware for Authentication
const passport = require('./auth');
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false});

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
app.use(bodyParser.urlencoded({ extended: true }));

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    next();
  };  
app.use(logRequest);

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes); 

app.listen(3000, () => {
    console.log('Listening on port 3000');
})


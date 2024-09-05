require('dotenv').config()
require('./configs/database').connect()


const express = require('express')
const auth = require('./controllers/auth');
const profile = require('./controllers/profile');
const midauth = require('./middlewares/auth')


const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello!'))


app.post('/register', auth.register);


app.post("/login", auth.login);

app.post('/welcome', midauth, (req, res) => {
    res.status(200).send("Welcome HACKER");
})

app.get('/profile', midauth, profile.getProfile);

app.put('/profile', midauth, profile.putProfile);

module.exports = app
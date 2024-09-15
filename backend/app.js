require('dotenv').config()
require('./configs/database').connect()


const express = require('express')
const auth = require('./controllers/auth');
const order = require('./controllers/order')
const midauth = require('./middlewares/auth')


const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello!'))

app.post('/register', auth.register);

app.post("/login", auth.login);

app.post("/createOrder", midauth, order.order);

app.post("/updateStatus", midauth, order.statusOrder);


module.exports = app
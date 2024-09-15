require('dotenv').config()
require('./configs/database').connect()


const express = require('express')
const auth = require('./controllers/auth');
const midauth = require('./middlewares/auth')
const cors = require('cors');


const app = express()
app.use(cors());

app.use(express.json())

app.get('/', (req, res) => res.send('Hello!'))

app.post('/register', auth.register);

app.post("/login", auth.login);

app.post("/logout", auth.logout);

app.post("/createOrder", midauth, order.order);

app.post("/updateStatus", midauth, order.statusOrder);


module.exports = app
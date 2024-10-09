require('dotenv').config()
require('./configs/database').connect()


const express = require('express')
const auth = require('./controllers/auth');
const search = require('./controllers/search');
const profile = require('./controllers/profile');
const order = require('./controllers/order');
const payment = require('./controllers/payment');
const clientSize = require('./controllers/clientSize');
const midauth = require('./middlewares/auth')
const cors = require('cors');

const app = express()
app.use(cors());

app.use(express.json())

app.get('/', (req, res) => res.send('Hello!'))

app.post('/register', auth.register);

app.post('/applyShop', auth.applyShop);

app.post("/login", auth.login);

app.post("/logout", auth.logout);

app.get("/search", search.search);

app.get("/filter", search.filter);

app.get('/profile', midauth, profile.getProfile);

app.put('/profile', midauth, profile.putProfile);

app.post("/createOrder", midauth, order.order);

app.post("/requestsOrder", midauth, order.requests);

app.patch("/manageOrder", midauth, order.manage);

app.patch("/createPayment", midauth , payment.create);

app.get('/shop/shopdata', profile.getAllShops)

app.get('/shop/shopdata/:id',profile.getShopProfile)

app.get('/order/history',midauth, order.getOrderHistoryController)

app.get('/order/orderdetail/:id',order.getOrderDetailController)

app.get('/clientSize/:id',clientSize.getClientSizeController)

app.post('/welcome', midauth, (req, res) => {
    res.status(200).send("Welcome HACKER");
})

module.exports = app
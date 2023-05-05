const express = require("express");

const app = express();

const dbconfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingRoute = require('./routes/bookingRoute')
const contactRoute = require('./routes/contactRoute')

app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/book/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingRoute)
app.use('/api/contact', contactRoute)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Node Server started'));
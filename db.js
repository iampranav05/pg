const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://pranavsbhandary55:3EsuGNbRgI86s02I@cluster55.rdmzo8z.mongodb.net/MERN-PGROOMS'

mongoose.connect(mongoURL , {useUnifiedTopology : true, useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error', () =>{
    console.log('Mongo Connection failed')
})

connection.on('connected', () =>{
    console.log('Mongo Connection succesful')
})

module.exports = mongoose
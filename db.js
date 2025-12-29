const mongoose = require('mongoose'); 
require('dotenv').config(); 

// URL of Local MongoDB Server
const mongoURL = process.env.MONGODB_URL_LOCAL

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;  

db.on('connected', () => {                      
    console.log('Connected to MongoDB Server')
})

db.on('error', () => {                           
    console.log('MongoDB Connection Error')
})

db.on('disconnected', () => {                   
    console.log('MongoDB Dis-Connected')
})

module.exports = db
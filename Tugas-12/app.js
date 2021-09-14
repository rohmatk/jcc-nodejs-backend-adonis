const express = require('express');
const app = express();
const VenueRouter = require('./routes/venue')
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/venue', VenueRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Masuk"
    })
})

app.listen(3000, () => {
    console.log("server is running")
})
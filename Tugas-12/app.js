const express = require('express');
const app = express();
const VanueRouter = require('./routes/vanue')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/vanue', VanueRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Masuk"
    })
})

app.listen(3000, () => {
    console.log("server is running")
})
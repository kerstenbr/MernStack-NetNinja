const express = require('express')
const workoutRoutes = require('./routes/workouts')
require('dotenv').config()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// conect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(PORT, () => {
            console.log(`Connected to db and listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })


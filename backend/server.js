const express = require('express')
const workoutRoutes = require('./routes/workouts')
require('dotenv').config()

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

// listen for request
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
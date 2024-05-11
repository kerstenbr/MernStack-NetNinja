const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// get a single workout
const getWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid mongo id' })
        }

        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// create new workout
const createWorkout = async (req, res) => {
    // add doc to db
    try {
        const { title, load, reps } = req.body
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid mongo id' })
        }

        const workout = await Workout.findOneAndDelete({ _id: id })

        if (!workout) {
            return res.status(400).json({ error: 'No such workout' })
        }

        res.status(200).json({ workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid mongo id' })
        }

        const workout = await Workout.findOneAndUpdate({ _id: id }, {
            ...req.body
        })

        if (!workout) {
            return res.status(400).json({ error: 'No such workout' })
        }

        res.status(200).json({ workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
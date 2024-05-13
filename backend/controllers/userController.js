const User = require("../models/userModel")
// const mongoose = require("mongoose")

// login user
const loginUser = async (req, res) => {
    res.json({ msg: "login user" })
}

//signup user
const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.signup(email, password)

        res.status(201).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }
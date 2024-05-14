const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    try {
        // verify authentication
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ error: "Authorization token required" })
        }

        const token = authorization.split(' ')[1]

        const { _id } = jwt.verify(token, process.env.SECRET_JWT)
        // req.user só irá ter o _id, não irá trazer o email ou a senha hash por causa do select!
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Invalid token"})
    }
}

module.exports = requireAuth
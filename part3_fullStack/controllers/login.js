const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
    const { body } = req
    const { username, password } = body

    const userFound = await User.findOne({ username })

    if (!userFound) return res.status(401).json({ message: 'invalid user or password' })
    const passwordCorret = await bcrypt.compare(password, userFound.passwordHash)
    if (!passwordCorret) return res.status(401).json({ message: 'invalid user or password' })

    const payload = {
        id: userFound._id,
        username: userFound.username
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.status(200).json({
        name: userFound.name,
        username: userFound.username,
        token
    })
})

module.exports = loginRouter

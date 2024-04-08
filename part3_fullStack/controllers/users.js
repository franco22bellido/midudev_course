const { Router } = require('express')
const bcrypt = require('bcrypt')
const usersRouter = Router()
const User = require('../models/User')

usersRouter.post('/', async (req, res, next) => {
    const { body } = req
    const { username, name, password } = body

    try {
        const userFound = await User.findOne({ username })
        if (userFound) return res.status(409).json({ error: '`username` to be unique' })

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            username,
            name,
            passwordHash

        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
})
usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('notes', {
        content: 1,
        date: 1,
        important: 1
    })
    return res.status(200).json(users)
})
usersRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ error: 'user not found' })
        return res.status(200).json(user.toJSON())
    } catch (error) {
        next(error)
    }
})
usersRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const userDeleted = await User.findByIdAndDelete(id)
        if (!userDeleted) return res.status(404).json({ error: 'user not found' })
        return res.status(204).end()
    } catch (error) {
        next(error)
    }
})
usersRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { username, name } = req.body

    try {
        const userToUpdate = await User.findById(id)
        if (!userToUpdate) return res.status(404).end()
        const userUpdate = await User.updateOne({
            _id: id,
            username,
            name
        })
        res.status(200).json(userUpdate)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter

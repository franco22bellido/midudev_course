const { Router } = require('express')
const usersRouter = Router()
const User = require('../models/User')

usersRouter.post('/', async (req, res) => {
    const { body } = req
    const { username, name, password } = body
    const newUser = new User({
        username,
        name,
        passwordHash: password

    })
    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
})
usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
})
usersRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = User.findById(id)
    if (!user) return res.status(404).end()
    return res.status(200).json(user)
})
usersRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const userDeleted = await User.findByIdAndDelete(id)
    if (!userDeleted) return res.status(404).end()
    return res.status(204).end()
})
usersRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { username, name } = req.body

    const userToUpdate = await User.findById(id)
    if (!userToUpdate) return res.status(404).end()
    const userUpdate = await User.updateOne({
        _id: id,
        username,
        name
    })
    res.status(200).json(userUpdate)
})

module.exports = usersRouter

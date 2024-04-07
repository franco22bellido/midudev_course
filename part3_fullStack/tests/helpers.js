const { app } = require('../index.js')
const User = require('../models/User.js')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [
    {
        content: 'learning FullStack JS with midudev',
        important: true,
        date: new Date()
    },
    {
        content: 'siguelo en https://midu.tube',
        important: true,
        date: new Date()
    },
    {
        content: 'todos los tests deben ser predecibles',
        important: true,
        date: new Date()
    }
]
const getAllContentsFromNotes = async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((note) => note.content)
    return { response, contents }
}
const getUsers = async () => {
    // const response = await api.get('/api/users')
    // return response.body
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialNotes,
    api,
    getUsers,
    getAllContentsFromNotes
}

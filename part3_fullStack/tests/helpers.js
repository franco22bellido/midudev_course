const { app } = require('../index.js')
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
    }
]
const getAllContentsFromNotes = async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((note) => note.content)
    return { response, contents }
}

module.exports = {
    initialNotes,
    api,
    getAllContentsFromNotes
}

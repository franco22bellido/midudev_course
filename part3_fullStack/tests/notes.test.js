const supertest = require('supertest')
const { app, server } = require('../index.js')
const mongoose = require('../mongo.js')
const Note = require('../models/NoteSchema.js')
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
beforeEach(async () => {
    await Note.deleteMany({})
    const note1 = new Note(initialNotes[0])
    await note1.save()
    const note2 = new Note(initialNotes[1])
    await note2.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})
test('the first note is about midudev', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('learning FullStack JS with midudev')
})

test('contain the response.body array a specific words?', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(note => note.content)

    expect(contents).toContain('learning FullStack JS with midudev')
})

afterAll(() => {
    server.close()
    mongoose.connection.close()
})

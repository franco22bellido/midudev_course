const { server } = require('../index.js')
const mongoose = require('../mongo.js')
const Note = require('../models/NoteSchema.js')

const { initialNotes, api, getAllContentsFromNotes } = require('./helpers.js')

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

test('the response.body array contain a specific words?', async () => {
    const { contents } = await getAllContentsFromNotes()

    expect(contents).toContain('learning FullStack JS with midudev')
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'Proximamente async/await',
        important: true,
        date: Date.now()
    }
    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentsFromNotes()
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
})
test('note when content is not added', async () => {
    const newNote = {
        important: true,
        date: Date.now()
    }
    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
    server.close()
    mongoose.connection.close()
})
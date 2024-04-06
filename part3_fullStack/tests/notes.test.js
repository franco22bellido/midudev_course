const { server } = require('../index.js')
const mongoose = require('../mongo.js')
const Note = require('../models/NoteSchema.js')

const { initialNotes, api, getAllContentsFromNotes } = require('./helpers.js')

beforeEach(async () => {
    await Note.deleteMany({})
    // parallel
    // const newNotes = initialNotes.map((note) => new Note(note))
    // const promises = newNotes.map(note => note.save())
    // await Promise.all(promises)

    // sequential
    for (const note of initialNotes) {
        const newNote = new Note(note)
        await newNote.save()
    }
})

describe('GET ALL NOTES', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('there are the same notes as in initalNotes', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(initialNotes.length)
    })

    test('the response.body array contain a specific words?', async () => {
        const { contents } = await getAllContentsFromNotes()

        expect(contents).toContain('learning FullStack JS with midudev')
    })
})

describe('POST ONE NOTE', () => {
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
})
describe('DELETE ONE NOTE', () => {
    test('a note can be deleted ', async () => {
        const { response: firstResponse } = await getAllContentsFromNotes()
        const { body: notes } = firstResponse
        const noteToDelete = notes[0]

        await api
            .delete(`/api/notes/${noteToDelete._id}`)
            .expect(204)

        const { response: secondResponse, contents } = await getAllContentsFromNotes()
        expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
        expect(contents).not.toContain(noteToDelete.contents)
    })
    test('try to delete with an invalid id', async () => {
        await api
            .delete('/api/notes/123123')
            .expect(400)

        const { response: secondResponse } = await getAllContentsFromNotes()
        expect(secondResponse.body).toHaveLength(initialNotes.length)
    })
    test('try to delete an id when it does not exist', async () => {
        await api
            .delete('/api/notes/000000000000000000000000')
            .expect(404)

        const { response: secondResponse } = await getAllContentsFromNotes()
        expect(secondResponse.body).toHaveLength(initialNotes.length)
    })
})

describe('GET ONE NOTE', () => {
    test('a note is found', async () => {
        const { response } = await getAllContentsFromNotes()
        const { body: notes } = response
        const noteOne = notes[0]

        await api
            .get(`/api/notes/${noteOne._id}`)
            .expect(200)
    })
    test('a note does not exist return 404', async () => {
        await api
            .get('/api/notes/000000000000000000000000')
            .expect(404)
    })
    test('invalid id return 400', async () => {
        await api
            .get('/api/notes/24192')
            .expect(400)
    })
})

describe('UPDATE ONE NOTE', () => {
    test('one note is update', async () => {
        const { response } = await getAllContentsFromNotes()
        const { body: notes } = response
        const noteToUpdate = notes[0]

        const newValuesOfNote = {
            content: 'making tests of endpoint update',
            important: true
        }
        await api
            .put(`/api/notes/${noteToUpdate._id}`)
            .send(newValuesOfNote)
            .expect(200)
    })
    test('one note to try update does not exist', async () => {
        const newValuesOfNote = {
            content: 'making tests of endpoint update',
            important: true
        }
        await api
            .put('/api/notes/000000000000000000000000')
            .send(newValuesOfNote)
            .expect(404)
    })
})

afterAll(() => {
    server.close()
    mongoose.connection.close()
})

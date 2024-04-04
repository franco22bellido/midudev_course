const supertest = require('supertest')
const { app, server } = require('../index.js')
const mongoose = require('../mongo.js')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    server.close()
    mongoose.connection.close()
})

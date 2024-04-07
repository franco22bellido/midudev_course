const { server } = require('../index.js')
const mongoose = require('../mongo.js')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helpers.js')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'francoRoot', name: 'franco', passwordHash })
    await user.save()
})

describe('creating a new user', () => {
    test('works as expected creating a fresh username', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            username: 'franco43',
            name: 'franco',
            password: 'theFacebook'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper status code and message if username is already exist', async () => {
        const usersAtStart = await getUsers()
        const newUser = { username: 'francoRoot', name: 'franco', password: 'francoTest' }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(409)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})

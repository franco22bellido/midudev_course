require('dotenv').config()
require('./mongo.js')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware.js')
const handleErrors = require('./handleErrors.js')
const usersRouter = require('./controllers/users.js')
const notesRouter = require('./controllers/notes.js')
const loginRouter = require('./controllers/login.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', loginRouter)

app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

module.exports = {
    app,
    server
}

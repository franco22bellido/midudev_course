require('dotenv').config()
require('./mongo.js')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware.js')
const Note = require('./models/NoteSchema.js')
const handleErrors = require('./handleErrors.js')
const usersRouter = require('./controllers/users')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.get('/api/notes', async (req, res) => {
    const notesFound = await Note.find({})
    if (!notesFound) {
        return res.status(404).json({ message: 'notes not found' })
    }
    res.status(200).json(notesFound)
})
app.get('/api/notes/:id', async (req, res, next) => {
    const id = req.params.id

    try {
        const noteFound = await Note.findById(id)
        if (!noteFound) return res.status(404).end()
        res.status(200).json(noteFound)
    } catch (error) {
        next(error)
    }
})
app.delete('/api/notes/:id', async (req, res, next) => {
    const id = req.params.id

    try {
        const noteDeleted = await Note.findByIdAndDelete(id)
        if (!noteDeleted) {
            return res.status(404).end()
        }
        return res.status(204).end()
    } catch (error) {
        next(error)
    }
})
app.put('/api/notes/:id', async (req, res, next) => {
    const id = req.params.id
    const note = req.body

    const newNoteValues = {
        _id: id,
        content: note.content,
        important: note.important
    }
    try {
        const noteFound = await Note.findById(id)
        if (!noteFound) return res.status(404).end()
        const noteUpdate = await Note.updateOne(newNoteValues)
        return res.status(200).json(noteUpdate)
    } catch (error) {
        next(error)
    }
})
app.post('/api/notes', async (req, res, next) => {
    const note = req.body

    if (!note.content) {
        return res.status(400).json({ message: 'content is required' })
    }

    const newNote = new Note({
        content: note.content,
        date: Date.now(),
        important: typeof note.important !== 'undefined' ? note.important : false
    })

    try {
        const savedNote = await newNote.save()
        res.status(200).json(savedNote)
    } catch (error) {
        next(error)
    }
})

app.use('/api/users', usersRouter)

app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

module.exports = {
    app,
    server
}

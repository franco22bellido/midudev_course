require('dotenv').config()
require('./mongo.js')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware.js')
const Note = require('./models/NoteSchema.js')
const handleErrors = require('./handleErrors.js')

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
app.get('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id)
        .then((noteFound) => {
            if (!noteFound) {
                return res.status(404).end()
            }
            res.status(200).json(noteFound)
        })
        .catch((err) => {
            next(err)
        })
})
app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then((noteFound) => {
            if (!noteFound) {
                return res.status(404).end()
            }
            res.status(204).end()
        })
        .catch((err) => {
            next(err)
        })
})
app.put('/api/notes/:id', (req, res, next) => {
    const id = req.param.id
    const note = req.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findOneAndUpdate(id, newNoteInfo)
        .then((noteUpdated) => {
            res.status(200).json({ noteUpdated })
        })
        .catch((err) => {
            next(err)
        })
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

app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

module.exports = {
    app,
    server
}

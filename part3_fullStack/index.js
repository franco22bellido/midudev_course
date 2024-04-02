const connectDB = require('./mongo.js')
const express = require('express')
const logger = require('./loggerMiddleware.js')
const Note = require('./models/NoteSchema.js')
connectDB()

const app = express()

app.use(express.json())

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
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id)
        .then((noteFound) => {
            if (!noteFound) {
                return res.status(404).end()
            }
            res.status(200).json(noteFound)
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(400).json({ message: 'objectId malformed' })
            }
        })
})
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then((noteFound) => {
            if (!noteFound) {
                return res.status(404).end()
            }
            res.status(204).end()
        })
        .catch((err) => {
            console.log(err)
            if (err.name === 'CastError') {
                return res.status(400).json({ message: 'objectId malformed' })
            }
            return res.status(500).json({ message: 'internal server error' })
        })
})
app.post('/api/notes', (req, res) => {
    const note = req.body

    if (!note.content) {
        return res.status(400).json({ message: 'content is required' })
    }

    const newNote = new Note({
        content: note.content,
        date: Date.now(),
        important: typeof note.important !== 'undefined' ? note.important : false
    })

    newNote.save()
    res.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
